document.addEventListener('DOMContentLoaded', () => {
    /* THEME TOGGLE LOGIC */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('xuper_theme', theme);
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    const savedTheme = localStorage.getItem('xuper_theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    /* CONFIG */
    const SERVER_API = 'api/server.php';
    const FALLBACK_LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMTUxYTI0Ii8+PHRleHQgeD0iMTUiIHk9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5NGEzYjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlRWPC90ZXh0Pjwvc3ZnPg==";

    const SPORT_COLORS = {
        'Soccer':'#10b981','Basketball':'#f59e0b','American Football':'#ef4444',
        'Baseball':'#3b82f6','Ice Hockey':'#06b6d4','Tennis':'#eab308',
        'Motorsport':'#f97316','Boxing':'#a855f7','MMA':'#8b5cf6',
        'Rugby':'#22c55e','Cricket':'#14b8a6','Golf':'#84cc16'
    };
    function getSportColor(s) { return SPORT_COLORS[s] || '#94a3b8'; }
    function hexToRgba(h, a) {
        h = h.replace('#', '');
        const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
        return `rgba(${r},${g},${b},${a})`;
    }
    function sportBadge(sport) {
        const c = getSportColor(sport);
        return `<span class="sport-badge" style="background:${hexToRgba(c,0.1)};color:${c};border:1px solid ${hexToRgba(c,0.2)};"><i class="fas fa-circle" style="font-size:0.45rem"></i> ${escapeHtml(sport || 'Other')}</span>`;
    }

    const $ = id => document.getElementById(id);
    const guideEventsContainer = $('guide-events-container');
    const sidebarSports = $('sidebar-sports');
    const sidebarDates = $('sidebar-dates');
    const guideRefreshBtn = $('guide-refresh-btn');
    const guideSearchInput = $('guide-search');
    
    const playerOverlay = $('player-overlay'), playerIframe = $('player-iframe');
    const playerTitle = $('player-title'), playerChannelLogo = $('player-channel-logo');
    const playerLangBadge = $('player-lang-badge');
    const playerStreamsEl = $('player-streams');
    const closePlayerBtn = $('close-player'), reloadPlayerBtn = $('reload-player');
    const copyEmbedBtn = $('copy-embed'), copyLinkBtn = $('copy-link'), openWindowBtn = $('open-window-player');
    const toastEl = $('toast');

    let selectedSport = 'all'; 
    let selectedDate = 'today'; 
    let guideSearchQuery = '';
    let serverEventsCache = [];
    let currentStreams = [], currentStreamIndex = 0, currentEventId = null;
    
    const urlParams = new URLSearchParams(window.location.search);
    const autoEventId = urlParams.get('event');
    if (autoEventId) document.body.classList.add('standalone-player');

    const TIME_FMT = new Intl.DateTimeFormat(undefined, { hour:'2-digit', minute:'2-digit', hour12:false });
    function parseUtcDate(ev) {
        let raw = null;
        if (ev.strTimestamp) {
            raw = String(ev.strTimestamp).trim();
            if (raw && !/[Zz]\s*$|[+-]\d{2}:?\d{2}\s*$/.test(raw)) raw += 'Z';
            if (!raw) raw = null;
        } else if (ev.dateEvent && ev.strTime) raw = `${ev.dateEvent}T${ev.strTime}Z`;
        else if (ev.dateEvent) raw = `${ev.dateEvent}T00:00:00Z`;
        if (!raw) return null;
        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    }
    function eventToLocal(ev) {
        const d = parseUtcDate(ev);
        if (!d) return { time:'--:--', dateObj:null };
        return { time:TIME_FMT.format(d), dateObj:d };
    }
    function getLocalDateKey(d) { return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : null; }
    function todayKey() { return getLocalDateKey(new Date()); }
    
    function escapeHtml(str) { if (str == null) return ''; return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
    function debounce(fn, d) { let t; return function(...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this,a), d); }; }

    function showToast(msg) {
        toastEl.textContent = msg; toastEl.classList.add('show');
        clearTimeout(showToast._t); showToast._t = setTimeout(() => toastEl.classList.remove('show'), 2200);
    }
    function fallbackCopy(text, onSuccess) {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly','');
        ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.focus(); ta.select();
        try { document.execCommand('copy'); onSuccess(); } catch (e) { alert('Could not copy:\n' + text); }
        document.body.removeChild(ta);
    }
    function copyText(text, ok) {
        const done = () => showToast(ok || 'Copied');
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        else fallbackCopy(text, done);
    }
    function buildEmbedCode(url) {
        return `<iframe src="${url}" style="position:fixed; inset:0; width:100%; height:100%; border:0; display:block;" allow="autoplay; fullscreen; screen-wake-lock" allowfullscreen scrolling="no"></iframe>`;
    }

    function openPlayerWithStreams(title, logo, streams, idText) {
        currentStreams = Array.isArray(streams) ? streams : [];
        currentStreamIndex = 0;
        playerTitle.textContent = title;
        playerChannelLogo.src = logo || FALLBACK_LOGO;
        playerChannelLogo.onerror = function() { this.src = FALLBACK_LOGO; };
        playerLangBadge.style.display = 'none';
        renderStreamTabs();
        playCurrentStream();
        playerOverlay.classList.add('active');
        if (!document.body.classList.contains('standalone-player')) document.body.style.overflow = 'hidden';
    }
    
    function renderStreamTabs() {
        if (currentStreams.length === 0) {
            playerStreamsEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:20px;">No channels available</div>`;
            return;
        }
        playerStreamsEl.innerHTML = currentStreams.map((s, i) => {
            const lang = s.language ? ` · ${escapeHtml(s.language)}` : '';
            return `<button class="stream-tab ${i === currentStreamIndex ? 'active' : ''}" data-index="${i}"><i class="fas fa-tv"></i> <span>${escapeHtml(s.name)}${lang}</span></button>`;
        }).join('');
    }
    
    function playCurrentStream() {
        const s = currentStreams[currentStreamIndex];
        if (!s || !s.url) { playerIframe.src = ''; return; }
        playerIframe.src = s.url;
        if (currentStreams.length > 1) {
            if (s.language) { playerLangBadge.textContent = s.language; playerLangBadge.style.display = ''; }
            else playerLangBadge.style.display = 'none';
        } else {
            if (s.language) { playerLangBadge.textContent = s.language; playerLangBadge.style.display = ''; }
            else playerLangBadge.style.display = 'none';
        }
    }
    
    function switchStream(index) {
        if (index < 0 || index >= currentStreams.length) return;
        currentStreamIndex = index; renderStreamTabs(); playCurrentStream();
    }
    
    function openEventPlayer(ev) {
        if (!ev) { showToast('Event not found'); return; }
        if (!ev.streams || ev.streams.length === 0) { showToast('No channels available'); return; }
        const title = `${ev.strHomeTeam} vs ${ev.strAwayTeam}`;
        const logo = ev.strLeagueBadge || ev.strHomeTeamBadge || FALLBACK_LOGO;
        currentEventId = ev.idEvent;
        const streams = ev.streams.map(s => ({ name: s.name || 'Channel', url: s.url, language: s.language || '' }));
        openPlayerWithStreams(title, logo, streams, ev.idEvent);
    }
    
    function closePlayer() {
        if (document.body.classList.contains('standalone-player')) return; 
        playerOverlay.classList.remove('active'); document.body.style.overflow = '';
        setTimeout(() => { playerIframe.src = ''; }, 250);
    }
    
    function reloadPlayer() {
        const s = currentStreams[currentStreamIndex];
        if (!s || !s.url) return;
        playerIframe.src = ''; setTimeout(() => { playerIframe.src = s.url; }, 100);
        showToast('Reloading...');
    }
    
    playerStreamsEl.addEventListener('click', e => {
        const btn = e.target.closest('.stream-tab'); if (!btn) return;
        switchStream(parseInt(btn.dataset.index, 10));
    });
    closePlayerBtn.addEventListener('click', closePlayer);
    reloadPlayerBtn.addEventListener('click', reloadPlayer);

    copyLinkBtn.addEventListener('click', () => {
        if (document.body.classList.contains('standalone-player') && currentEventId) {
            const url = `${window.location.origin}${window.location.pathname}?event=${currentEventId}`;
            copyText(url, 'Event URL copied');
        } else {
            const s = currentStreams[currentStreamIndex];
            if (s && s.url) copyText(s.url, 'Channel URL copied');
        }
    });
    copyEmbedBtn.addEventListener('click', () => {
        const s = currentStreams[currentStreamIndex];
        if (s && s.url) copyText(buildEmbedCode(s.url), 'Embed copied');
    });
    openWindowBtn.addEventListener('click', () => {
        if (!currentEventId) { showToast('No active event'); return; }
        const url = `${window.location.origin}${window.location.pathname}?event=${currentEventId}`;
        window.open(url, '_blank');
    });
    playerOverlay.addEventListener('click', e => { if (e.target === playerOverlay) closePlayer(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && playerOverlay.classList.contains('active')) closePlayer(); });

    async function fetchServerEvents() {
        try {
            const res = await fetch(`${SERVER_API}?action=list_published&_=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            serverEventsCache = Array.isArray(data.events) ? data.events : [];
            return true;
        } catch (e) { return false; }
    }

    function getFilteredEventsBase() {
        let base = [...serverEventsCache];
        if (guideSearchQuery) {
            const q = guideSearchQuery.toLowerCase().trim();
            base = base.filter(ev => [ev.strHomeTeam, ev.strAwayTeam, ev.strLeague, ev.strSport].filter(Boolean).join(' ').toLowerCase().includes(q));
        }
        if (selectedDate) {
            base = base.filter(ev => {
                const d = parseUtcDate(ev);
                return d && getLocalDateKey(d) === selectedDate;
            });
        }
        return base;
    }

    function renderSidebarSports() {
        const baseEvents = getFilteredEventsBase();
        const counts = { all: baseEvents.length, featured: 0 };
        for (const ev of baseEvents) {
            if (ev.featured) counts.featured++;
            const s = ev.strSport || 'Other';
            counts[s] = (counts[s] || 0) + 1;
        }
        
        let html = `
            <button class="sport-btn ${selectedSport === 'all' ? 'active' : ''}" data-sport="all">
                <span class="sport-icon"><i class="fas fa-globe"></i></span>
                <span>All sports</span>
                <span class="sport-count">${counts.all}</span>
            </button>
            <button class="sport-btn featured-btn ${selectedSport === 'featured' ? 'active' : ''}" data-sport="featured">
                <span class="sport-icon"><i class="fas fa-star"></i></span>
                <span>Featured</span>
                <span class="sport-count">${counts.featured}</span>
            </button>
        `;

        const sportsList = Object.keys(counts).filter(k => k !== 'all' && k !== 'featured').sort();
        for (const sport of sportsList) {
            const c = getSportColor(sport);
            html += `
                <button class="sport-btn ${selectedSport === sport ? 'active' : ''}" data-sport="${escapeHtml(sport)}">
                    <span class="sport-icon" style="color:${c}"><i class="fas fa-circle" style="font-size:0.5rem"></i></span>
                    <span>${escapeHtml(sport)}</span>
                    <span class="sport-count">${counts[sport]}</span>
                </button>
            `;
        }
        sidebarSports.innerHTML = html;
    }

    sidebarSports.addEventListener('click', (e) => {
        const btn = e.target.closest('.sport-btn');
        if (!btn) return;
        selectedSport = btn.dataset.sport;
        renderSidebarSports();
        renderGuide();
    });

    function renderSidebarDates() {
        const datesSet = new Set();
        for (const ev of serverEventsCache) {
            const d = parseUtcDate(ev);
            if (d) datesSet.add(getLocalDateKey(d));
        }
        
        const today = todayKey();
        if (!datesSet.has(today) && [...datesSet].some(d => d > today)) datesSet.add(today);

        const sortedDates = [...datesSet].sort();
        const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        
        let html = '';
        for (const dateStr of sortedDates) {
            const dParts = dateStr.split('-');
            const d = new Date(parseInt(dParts[0]), parseInt(dParts[1])-1, parseInt(dParts[2]));
            const dName = dateStr === today ? 'TODAY' : dayNames[d.getDay()];
            const dNum = d.getDate();
            const dMonth = monthNames[d.getMonth()];
            
            html += `
                <button class="date-btn ${selectedDate === dateStr ? 'active' : ''}" data-date="${dateStr}">
                    <span class="d-name">${dName}</span>
                    <span class="d-num">${dNum}</span>
                    <span class="d-month">${dMonth}</span>
                </button>
            `;
        }
        if (sortedDates.length === 0) html = `<div style="text-align:center; font-size:0.8rem; color:var(--text-muted); padding:20px 0;">No dates</div>`;
        sidebarDates.innerHTML = html;
    }

    sidebarDates.addEventListener('click', (e) => {
        const btn = e.target.closest('.date-btn');
        if (!btn) return;
        selectedDate = btn.dataset.date;
        renderSidebarDates();
        renderSidebarSports(); 
        renderGuide();
    });

    function renderGuide() {
        if (serverEventsCache.length === 0) {
            guideEventsContainer.innerHTML = `<div class="guide-empty"><i class="fas fa-calendar-plus"></i><p>No events available right now.</p><p style="font-size:0.9rem; opacity:0.7;">Check back later.</p></div>`;
            return;
        }

        let filtered = getFilteredEventsBase();

        if (selectedSport === 'featured') filtered = filtered.filter(ev => ev.featured);
        else if (selectedSport !== 'all') filtered = filtered.filter(ev => (ev.strSport || 'Other') === selectedSport);

        if (filtered.length === 0) {
            guideEventsContainer.innerHTML = `<div class="guide-empty"><i class="fas fa-search"></i><p>No events match the selected filters.</p></div>`;
            return;
        }

        filtered.sort((a, b) => {
            const da = parseUtcDate(a), db = parseUtcDate(b);
            if (!da && !db) return 0; if (!da) return 1; if (!db) return -1;
            return da - db;
        });

        const parts = filtered.map(ev => {
            const local = eventToLocal(ev);
            const homeBadge = ev.strHomeTeamBadge || FALLBACK_LOGO;
            const awayBadge = ev.strAwayTeamBadge || FALLBACK_LOGO;
            const leagueBadge = ev.strLeagueBadge || FALLBACK_LOGO;
            const streamCount = (ev.streams || []).length;
            const featured = !!ev.featured;
            const sportColor = getSportColor(ev.strSport);
            const watchLabel = streamCount > 1 ? `${streamCount} channels` : 'Watch';
            
            return `
                <div class="guide-card ${featured ? 'featured' : ''}" style="--sport-color:${sportColor};" data-event-id="${ev.idEvent}">
                    <div class="guide-card-header">
                        <div class="guide-league"><img src="${leagueBadge}" alt="" loading="lazy" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strLeague || 'League')}</span></div>
                        <div class="guide-header-right">
                            ${featured ? '<i class="fas fa-star featured-star" title="Featured event"></i>' : ''}
                            <div class="guide-time"><i class="far fa-clock"></i> ${local.time}</div>
                        </div>
                    </div>
                    <div class="guide-teams">
                        <div class="guide-team"><img src="${homeBadge}" alt="" loading="lazy" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strHomeTeam)}</span></div>
                        <div class="guide-vs">VS</div>
                        <div class="guide-team"><img src="${awayBadge}" alt="" loading="lazy" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strAwayTeam)}</span></div>
                    </div>
                    <div class="guide-footer">
                        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                            ${sportBadge(ev.strSport)}
                        </div>
                        <span class="guide-channel"><i class="fas fa-circle-play"></i> ${watchLabel}</span>
                    </div>
                </div>`;
        });
        guideEventsContainer.innerHTML = parts.join('');
    }

    guideEventsContainer.addEventListener('click', e => {
        const card = e.target.closest('.guide-card');
        if (!card) return;
        const idEvent = card.dataset.eventId;
        const ev = serverEventsCache.find(x => String(x.idEvent) === String(idEvent));
        if (ev) openEventPlayer(ev);
        else showToast('Event not available');
    });

    const renderGuideDebounced = debounce(renderGuide, 150);
    guideSearchInput.addEventListener('input', () => { 
        guideSearchQuery = guideSearchInput.value; 
        renderSidebarSports(); 
        renderGuideDebounced(); 
    });
    
    guideRefreshBtn.addEventListener('click', async () => { 
        await fetchServerEvents(); 
        renderSidebarSports();
        renderSidebarDates();
        renderGuide(); 
        showToast('Guide updated'); 
    });

    const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('xuper_sync') : null;
    let lastDayKey = todayKey();
    
    (async function init() {
        await fetchServerEvents();
        
        if (autoEventId) {
            const ev = serverEventsCache.find(x => String(x.idEvent) === String(autoEventId));
            if (ev) openEventPlayer(ev);
            else document.body.innerHTML = `<div style="display:flex; height:100vh; align-items:center; justify-content:center; color:#f8fafc; background:#0f1115; font-family:sans-serif;">Event not found or unavailable.</div>`;
            return; 
        }

        selectedDate = todayKey();
        
        renderSidebarSports();
        renderSidebarDates();
        renderGuide();

        if (bc) {
            bc.onmessage = async (msg) => {
                if (msg.data && msg.data.t === 'updated') {
                    const ok = await fetchServerEvents();
                    if (ok) {
                        renderSidebarSports();
                        renderSidebarDates();
                        renderGuide();
                    }
                }
            };
        }

        setInterval(async () => {
            if (document.visibilityState !== 'visible') return;
            const newKey = todayKey();
            if (newKey !== lastDayKey) {
                lastDayKey = newKey;
                await fetchServerEvents();
                selectedDate = newKey;
                renderSidebarSports();
                renderSidebarDates();
                renderGuide();
            } else {
                const ok = await fetchServerEvents();
                if (ok) {
                    renderSidebarSports();
                    renderSidebarDates();
                    renderGuide();
                }
            }
        }, 60000);
    })();
});