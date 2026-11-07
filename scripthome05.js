document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. INYECCIÓN DE ESTILOS PERSONALIZADOS
       ========================================================= */
    (function injectCustomStyles() {
        if (document.getElementById('xuper-custom-styles')) return;
        const style = document.createElement('style');
        style.id = 'xuper-custom-styles';
        style.textContent = `
            /* ========== TOP BAR BOTONES ========== */
            .btn-outline { background: #151a24 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; transition: all 0.2s !important; }
            .btn-outline:hover { background: #1c2230 !important; border-color: #94a3b8 !important; }
            .btn-outline.btn-theme { background: #151a24 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; }
            .btn-outline.btn-theme:hover { background: #1c2230 !important; }

            /* ========== SIDEBAR: SPORT BUTTONS ========== */
            .sport-btn { background: #151a24 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; transition: all 0.2s !important; }
            .sport-btn:hover { background: #1c2230 !important; }
            .sport-btn.active { background: #1c2230 !important; border-color: var(--sport-color, #4b5563) !important; }

            /* ========== SIDEBAR: DATE BUTTONS ========== */
            .date-btn { background: #151a24 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; transition: all 0.2s !important; }
            .date-btn:hover { background: #1c2230 !important; border-color: #94a3b8 !important; }
            .date-btn.active { background: #1c2230 !important; border-color: #4b5563 !important; }

            /* ========== EVENTO SIN EQUIPOS ========== */
            .guide-teams-single { display: flex !important; justify-content: center !important; align-items: center !important; padding: 16px 10px !important; }
            .guide-team-single { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 10px !important; flex: 1 !important; text-align: center !important; min-width: 0 !important; }
            .guide-team-single img { width: 64px !important; height: 64px !important; object-fit: contain !important; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)) !important; }
            .guide-team-single span { font-size: 0.95rem !important; font-weight: 700 !important; line-height: 1.3 !important; word-break: break-word !important; max-width: 100% !important; }

            /* ========== PLAYER ========== */
            .player-container { background: #151a24 !important; border: 1px solid #263145 !important; }
            .player-header { background: #151a24 !important; border-bottom: 1px solid #263145 !important; color: #f1f5f9 !important; }
            .player-body { background: #0f1115 !important; }
            .player-sidebar { background: #0f1115 !important; border-right: 1px solid #263145 !important; }
            .player-main { background: #0f1115 !important; }
            .player-footer { background: #0f1115 !important; border-top: 1px solid #263145 !important; color: #94a3b8 !important; }
            .stream-list-header { background: #151a24 !important; border-bottom: 1px solid #263145 !important; color: #f1f5f9 !important; }
            .player-btn { background: #1f2937 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; transition: all 0.2s !important; }
            .player-btn:hover { background: #334155 !important; border-color: #94a3b8 !important; }
            .player-btn.btn-reload, .player-btn.btn-url, .player-btn.btn-embed, .player-btn.btn-window { background: #1f2937 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; }
            .player-btn.btn-reload:hover, .player-btn.btn-url:hover, .player-btn.btn-embed:hover, .player-btn.btn-window:hover { background: #334155 !important; border-color: #94a3b8 !important; }
            .channels-toggle-btn { background: #1f2937 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; }
            .channels-toggle-btn:hover { background: #334155 !important; }
            .close-player { background: #1f2937 !important; color: #f1f5f9 !important; border: 1px solid #263145 !important; }
            .close-player:hover { background: #334155 !important; }
            .close-sidebar-btn { background: #1f2937 !important; color: #f1f5f9 !important; border: 1px solid #263145 !important; }

            /* ========== STREAM TABS ========== */
            .stream-tab { display: flex !important; align-items: center !important; gap: 10px !important; padding: 11px 14px !important; border-radius: 10px !important; background: #151a24 !important; border: 1px solid #263145 !important; color: #f1f5f9 !important; width: 100% !important; text-align: left !important; cursor: pointer !important; transition: all 0.2s !important; margin-bottom: 6px !important; font-size: 0.9rem !important; }
            .stream-tab:hover { background: #1c2230 !important; border-color: #94a3b8 !important; transform: translateX(2px); }
            .stream-tab.active { background: #1c2230 !important; border-color: #4b5563 !important; box-shadow: inset 3px 0 0 #4b5563 !important; }
            .stream-tab .fa-tv { color: #94a3b8 !important; flex-shrink: 0; }
            .stream-tab .stream-label { flex: 1 !important; font-weight: 600 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
            .stream-tab .stream-flag { display: inline-flex !important; align-items: center !important; flex-shrink: 0 !important; }
            .stream-tab .flag-icon { width: 22px !important; height: 15px !important; border-radius: 3px !important; object-fit: cover !important; box-shadow: 0 1px 2px rgba(0,0,0,0.4) !important; display: block !important; }

            /* ========== LOAD MORE BUTTON ========== */
            .guide-load-more-btn { display: block; margin: 24px auto 8px; padding: 12px 28px; font-size: 0.9rem; font-weight: 600; background: #151a24; border: 1px solid #263145; color: #f1f5f9; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
            .guide-load-more-btn:hover { background: #1c2230; border-color: #94a3b8; }
            .guide-load-more-btn i { margin-right: 6px; }
        `;
        document.head.appendChild(style);
    })();

    /* =========================================================
       2. THEME TOGGLE
       ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('xuper_theme', theme);
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    setTheme(localStorage.getItem('xuper_theme') || 'dark');
    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    /* =========================================================
       3. HELPERS
       ========================================================= */
    function escapeHtml(str) { if (str == null) return ''; return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
    function debounce(fn, d) { let t; return function(...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this,a), d); }; }

    function localImg(url) {
        if (!url) return '';
        const u = String(url).trim();
        if (u.startsWith('images/') || u.startsWith('data:')) return u;
        if (u.startsWith('/images/')) return u.substring(1);
        return '';
    }

    function formatLanguage(lang) {
        if (!lang) return '';
        if (lang.length === 2 && /^[A-Za-z]{2}$/.test(lang)) {
            return `<img src="https://flagcdn.com/w20/${lang.toLowerCase()}.png" class="flag-icon" alt="${lang}">`;
        }
        return escapeHtml(lang);
    }

    /* =========================================================
       4. ICONOS Y ORDEN DE DEPORTES
       ========================================================= */
    const SPORT_ICONS = {
        'all': '🏟️',
        'featured': '⭐',
        'live': '🔴',
        'finished': '✅',
        'Soccer': '⚽',
        'Basketball': '🏀',
        'American Football': '🏈',
        'Baseball': '⚾',
        'Ice Hockey': '🏒',
        'Tennis': '🎾',
        'Motorsport': '🏎️',
        'Boxing': '🥊',
        'MMA': '🥋',
        'Rugby': '🏉',
        'Cricket': '🏏',
        'Golf': '⛳',
        'Snooker': '🎱',
        'Other': '🏅'
    };

    const SPORT_ORDER = [
        'Soccer', 'Basketball', 'American Football', 'Baseball', 'Ice Hockey',
        'Tennis', 'Motorsport', 'Boxing', 'MMA', 'Rugby', 'Cricket', 'Golf', 'Snooker'
    ];

    /* =========================================================
       5. CONFIG
       ========================================================= */
    const SERVER_API = 'api/server.php';
    const FALLBACK_LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMTUxYTI0Ii8+PHRleHQgeD0iMTUiIHk9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5NGEzYjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlRWPC90ZXh0Pjwvc3ZnPg==";
    const EVENTS_PER_PAGE = 64;
    const SYNC_INTERVAL_MS = 120000; // 2 minutos

    const SPORT_COLORS = {
        'Soccer':'#10b981','Basketball':'#f59e0b','American Football':'#ef4444',
        'Baseball':'#3b82f6','Ice Hockey':'#06b6d4','Tennis':'#eab308',
        'Motorsport':'#f97316','Boxing':'#a855f7','MMA':'#8b5cf6',
        'Rugby':'#22c55e','Cricket':'#14b8a6','Golf':'#84cc16'
    };
    function getSportColor(s) { return SPORT_COLORS[s] || '#94a3b8'; }
    function hexToRgba(h, a) { h = h.replace('#', ''); const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16); return `rgba(${r},${g},${b},${a})`; }
    function sportBadge(sport) { const c = getSportColor(sport); return `<span class="sport-badge" style="background:${hexToRgba(c,0.1)};color:${c};border:1px solid ${hexToRgba(c,0.2)};"><i class="fas fa-circle" style="font-size:0.45rem"></i> ${escapeHtml(sport || 'Other')}</span>`; }

    /* =========================================================
       6. SELECTORS
       ========================================================= */
    const $ = id => document.getElementById(id);
    const guideEventsContainer = $('guide-events-container');
    const sidebarSports = $('sidebar-sports');
    const sidebarDates = $('sidebar-dates');
    const guideRefreshBtn = $('guide-refresh-btn');
    const guideSearchInput = $('guide-search');
    const playerOverlay = $('player-overlay'), playerIframe = $('player-iframe');
    const playerContainer = $('player-container');
    const playerTitle = $('player-title'), playerChannelLogo = $('player-channel-logo');
    const playerStreamsEl = $('player-streams');
    const toggleChannelsBtn = $('toggle-channels-btn');
    const closeSidebarBtn = $('close-sidebar-btn');
    const closePlayerBtn = $('close-player'), reloadPlayerBtn = $('reload-player');
    const copyEmbedBtn = $('copy-embed'), copyLinkBtn = $('copy-link'), openWindowBtn = $('open-window-player');
    const toastEl = $('toast');

    /* =========================================================
       7. ESTADO
       ========================================================= */
    let selectedSport = 'all';
    let selectedDate = 'today';
    let guideSearchQuery = '';
    let serverEventsCache = [];
    let currentStreams = [], currentStreamIndex = 0, currentEventId = null;
    let currentPage = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const autoEventId = urlParams.get('event');
    if (autoEventId) document.body.classList.add('standalone-player');

    /* =========================================================
       8. FECHAS
       ========================================================= */
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
    function eventToLocal(ev) { const d = parseUtcDate(ev); if (!d) return { time:'--:--', dateObj:null }; return { time:TIME_FMT.format(d), dateObj:d }; }
    function getLocalDateKey(d) { return d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` : null; }
    function todayKey() { return getLocalDateKey(new Date()); }

    /* =========================================================
       9. TOAST / COPY
       ========================================================= */
    function showToast(msg) { toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(showToast._t); showToast._t = setTimeout(() => toastEl.classList.remove('show'), 2200); }
    function fallbackCopy(text, onSuccess) { const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly',''); ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.focus(); ta.select(); try { document.execCommand('copy'); onSuccess(); } catch (e) { alert('Could not copy:\n' + text); } document.body.removeChild(ta); }
    function copyText(text, ok) { const done = () => showToast(ok || 'Copied'); if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done)); else fallbackCopy(text, done); }
    function buildEmbedCode(url) { return `<iframe src="${url}" style="position:fixed; inset:0; width:100%; height:100%; border:0; display:block;" allow="autoplay; fullscreen; screen-wake-lock" allowfullscreen scrolling="no"></iframe>`; }

    /* =========================================================
       10. PLAYER
       ========================================================= */
    toggleChannelsBtn.addEventListener('click', () => { playerContainer.classList.toggle('show-sidebar'); });
    closeSidebarBtn.addEventListener('click', () => { playerContainer.classList.remove('show-sidebar'); });

    function openPlayerWithStreams(title, logo, streams, idText) {
        currentStreams = Array.isArray(streams) ? streams : [];
        currentStreamIndex = 0;
        playerTitle.textContent = title;
        playerChannelLogo.src = logo || FALLBACK_LOGO;
        playerChannelLogo.onerror = function() { this.src = FALLBACK_LOGO; };
        playerContainer.classList.remove('show-sidebar');
        renderStreamTabs();
        playCurrentStream();
        playerOverlay.classList.add('active');
        if (!document.body.classList.contains('standalone-player')) document.body.style.overflow = 'hidden';
    }

    function renderStreamTabs() {
        if (currentStreams.length === 0) { playerStreamsEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:20px;">No channels available</div>`; return; }
        playerStreamsEl.innerHTML = currentStreams.map((s, i) => {
            const lang = s.language ? formatLanguage(s.language) : '';
            const label = `Option ${i + 1}`;
            return `<button class="stream-tab ${i === currentStreamIndex ? 'active' : ''}" data-index="${i}">
                <i class="fas fa-tv"></i> 
                <span class="stream-label">${label}</span>
                ${lang ? `<span class="stream-flag">${lang}</span>` : ''}
            </button>`;
        }).join('');
    }

    function playCurrentStream() { const s = currentStreams[currentStreamIndex]; if (!s || !s.url) { playerIframe.src = ''; return; } playerIframe.src = s.url; }
    function switchStream(index) { if (index < 0 || index >= currentStreams.length) return; currentStreamIndex = index; renderStreamTabs(); playCurrentStream(); }

    function openEventPlayer(ev) {
        if (!ev) { showToast('Event not found'); return; }
        if (!ev.streams || ev.streams.length === 0) { showToast('No channels available'); return; }
        const hasTeams = ev.strHomeTeam && ev.strAwayTeam;
        const title = hasTeams ? `${ev.strHomeTeam} vs ${ev.strAwayTeam}` : (ev.strEvent || ev.strLeague || 'Event');
        const logo = localImg(ev.strLeagueBadge) || localImg(ev.strHomeTeamBadge) || localImg(ev.strThumb) || FALLBACK_LOGO;
        currentEventId = ev.idEvent;
        const streams = ev.streams.map(s => ({ name: s.name || 'Channel', url: s.url, language: s.language || '' }));
        openPlayerWithStreams(title, logo, streams, ev.idEvent);
    }

    function closePlayer() { if (document.body.classList.contains('standalone-player')) return; playerOverlay.classList.remove('active'); document.body.style.overflow = ''; playerContainer.classList.remove('show-sidebar'); setTimeout(() => { playerIframe.src = ''; }, 250); }
    function reloadPlayer() { const s = currentStreams[currentStreamIndex]; if (!s || !s.url) return; playerIframe.src = ''; setTimeout(() => { playerIframe.src = s.url; }, 100); showToast('Reloading...'); }

    playerStreamsEl.addEventListener('click', e => { const btn = e.target.closest('.stream-tab'); if (!btn) return; switchStream(parseInt(btn.dataset.index, 10)); if (window.innerWidth <= 768) { playerContainer.classList.remove('show-sidebar'); } });
    closePlayerBtn.addEventListener('click', closePlayer);
    reloadPlayerBtn.addEventListener('click', reloadPlayer);

    copyLinkBtn.addEventListener('click', () => { if (currentEventId) { const url = `${window.location.origin}${window.location.pathname}?event=${currentEventId}`; copyText(url, 'Event URL copied'); } else { showToast('No event active'); } });
    copyEmbedBtn.addEventListener('click', () => { const s = currentStreams[currentStreamIndex]; if (s && s.url) copyText(buildEmbedCode(s.url), 'Embed copied'); });
    openWindowBtn.addEventListener('click', () => { if (!currentEventId) { showToast('No active event'); return; } const url = `${window.location.origin}${window.location.pathname}?event=${currentEventId}`; window.open(url, '_blank'); });

    playerOverlay.addEventListener('click', e => { if (e.target === playerOverlay) closePlayer(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && playerOverlay.classList.contains('active')) closePlayer(); });

    /* =========================================================
       11. FETCH + SYNC
       ========================================================= */
    async function fetchServerEvents() {
        try {
            const res = await fetch(`${SERVER_API}?action=list_published&_=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            serverEventsCache = Array.isArray(data.events) ? data.events : [];
            return true;
        } catch (e) { return false; }
    }

    async function syncLivescores() {
        try {
            await fetch(`${SERVER_API}?action=sync_livescores&_=${Date.now()}`, { cache: 'no-store' });
        } catch (e) { /* silencioso */ }
    }

    /* =========================================================
       12. ESTADO DE EVENTO (LIVE / FINISHED)
       ========================================================= */
    const FINAL_STATUSES = ['FT', 'AET', 'PEN', 'Match Finished', 'Finished', 'Final'];
    const NOT_STARTED_STATUSES = ['NS', 'Not Started', 'TBD', 'Time to be defined'];

    function isLiveEvent(ev) {
        const status = (ev.strStatus || '').trim();
        const progress = (ev.strProgress || '').trim();
        if (!status && !progress) return false;
        if (FINAL_STATUSES.includes(status) || progress === 'Final') return false;
        if (NOT_STARTED_STATUSES.includes(status)) return false;
        return true;
    }

    function isFinishedEvent(ev) {
        const status = (ev.strStatus || '').trim();
        const progress = (ev.strProgress || '').trim();
        if (FINAL_STATUSES.includes(status) || progress === 'Final') return true;
        return false;
    }

    function getScoreLabel(ev) {
        const h = ev.intHomeScore, a = ev.intAwayScore;
        if (h === null || h === undefined || h === '' || a === null || a === undefined || a === '') return '';
        return `${h} - ${a}`;
    }

    function getLiveBadge(ev) {
        if (isLiveEvent(ev)) {
            const prog = (ev.strProgress || '').trim();
            const text = prog && prog !== 'Final' ? prog : 'LIVE';
            return `<span class="live-badge" style="display:inline-flex;align-items:center;gap:4px;background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:2px 8px;border-radius:6px;font-size:0.65rem;font-weight:800;"><span style="width:6px;height:6px;background:#ef4444;border-radius:50%;animation:pulse 1.2s infinite;"></span> ${escapeHtml(text)}</span>`;
        }
        if (isFinishedEvent(ev)) {
            const score = getScoreLabel(ev);
            return `<span class="finished-badge" style="display:inline-flex;align-items:center;gap:4px;background:rgba(16,185,129,0.1);color:#34d399;border:1px solid rgba(16,185,129,0.2);padding:2px 8px;border-radius:6px;font-size:0.65rem;font-weight:800;"><i class="fas fa-check-circle"></i> FT ${score ? `· ${escapeHtml(score)}` : ''}</span>`;
        }
        return '';
    }

    // Añadir animación pulse si no existe
    (function addPulseStyle() {
        if (document.getElementById('live-pulse-style')) return;
        const st = document.createElement('style');
        st.id = 'live-pulse-style';
        st.textContent = `@keyframes pulse { 0%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} 100%{opacity:1;transform:scale(1)} }`;
        document.head.appendChild(st);
    })();

    /* =========================================================
       13. FILTROS BASE
       ========================================================= */
    function getFilteredEventsBase() {
        let base = [...serverEventsCache];
        if (guideSearchQuery) {
            const q = guideSearchQuery.toLowerCase().trim();
            base = base.filter(ev => [ev.strHomeTeam, ev.strAwayTeam, ev.strEvent, ev.strLeague, ev.strSport].filter(Boolean).join(' ').toLowerCase().includes(q));
        }
        if (selectedDate) {
            base = base.filter(ev => { const d = parseUtcDate(ev); return d && getLocalDateKey(d) === selectedDate; });
        }
        return base;
    }

    /* =========================================================
       14. SIDEBAR: DEPORTES + LIVE + FINISHED
       ========================================================= */
    function renderSidebarSports() {
        const baseEvents = getFilteredEventsBase();
        const counts = { all: baseEvents.length, featured: 0, live: 0, finished: 0 };
        for (const ev of baseEvents) {
            if (ev.featured) counts.featured++;
            if (isLiveEvent(ev)) counts.live++;
            if (isFinishedEvent(ev)) counts.finished++;
            const s = ev.strSport || 'Other';
            counts[s] = (counts[s] || 0) + 1;
        }

        let html = `
            <button class="sport-btn ${selectedSport === 'all' ? 'active' : ''}" data-sport="all" style="--sport-color: var(--border-active);">
                <span class="sport-icon">${SPORT_ICONS['all']}</span><span>All sports</span><span class="sport-count">${counts.all}</span>
            </button>
            <button class="sport-btn featured-btn ${selectedSport === 'featured' ? 'active' : ''}" data-sport="featured" style="--sport-color: var(--accent-gold);">
                <span class="sport-icon">${SPORT_ICONS['featured']}</span><span>Featured</span><span class="sport-count">${counts.featured}</span>
            </button>
            <button class="sport-btn ${selectedSport === 'live' ? 'active' : ''}" data-sport="live" style="--sport-color: #ef4444;">
                <span class="sport-icon">${SPORT_ICONS['live']}</span><span>Live</span><span class="sport-count">${counts.live}</span>
            </button>
            <button class="sport-btn ${selectedSport === 'finished' ? 'active' : ''}" data-sport="finished" style="--sport-color: #10b981;">
                <span class="sport-icon">${SPORT_ICONS['finished']}</span><span>Finished</span><span class="sport-count">${counts.finished}</span>
            </button>
        `;

        const rawSports = Object.keys(counts).filter(k => !['all','featured','live','finished'].includes(k));
        const sortedSports = rawSports.sort((a, b) => {
            let idxA = SPORT_ORDER.indexOf(a); let idxB = SPORT_ORDER.indexOf(b);
            if (idxA === -1) idxA = 999; if (idxB === -1) idxB = 999;
            return idxA - idxB;
        });

        for (const sport of sortedSports) {
            const c = getSportColor(sport);
            const icon = SPORT_ICONS[sport] || SPORT_ICONS['Other'];
            html += `<button class="sport-btn ${selectedSport === sport ? 'active' : ''}" data-sport="${escapeHtml(sport)}" style="--sport-color: ${c};"><span class="sport-icon">${icon}</span><span>${escapeHtml(sport)}</span><span class="sport-count">${counts[sport]}</span></button>`;
        }

        sidebarSports.innerHTML = html;
        if (window.twemoji) twemoji.parse(sidebarSports, { folder: 'svg', ext: '.svg' });
    }

    sidebarSports.addEventListener('click', (e) => {
        const btn = e.target.closest('.sport-btn'); if (!btn) return;
        selectedSport = btn.dataset.sport; currentPage = 1;
        renderSidebarSports(); renderGuide();
    });

    /* =========================================================
       15. SIDEBAR: FECHAS
       ========================================================= */
    function renderSidebarDates() {
        const datesSet = new Set();
        for (const ev of serverEventsCache) { const d = parseUtcDate(ev); if (d) datesSet.add(getLocalDateKey(d)); }
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
            html += `<button class="date-btn ${selectedDate === dateStr ? 'active' : ''}" data-date="${dateStr}"><span class="d-name">${dName}</span><span class="d-num">${d.getDate()}</span><span class="d-month">${monthNames[d.getMonth()]}</span></button>`;
        }
        if (sortedDates.length === 0) html = `<div style="text-align:center; font-size:0.8rem; color:var(--text-muted); padding:20px 0;">No dates</div>`;
        sidebarDates.innerHTML = html;
    }

    sidebarDates.addEventListener('click', (e) => {
        const btn = e.target.closest('.date-btn'); if (!btn) return;
        selectedDate = btn.dataset.date; currentPage = 1;
        renderSidebarDates(); renderSidebarSports(); renderGuide();
    });

    /* =========================================================
       16. LOAD MORE (ACUMULATIVO)
       ========================================================= */
    function renderLoadMoreButton(show, nextLoad) {
        let btn = document.getElementById('guide-load-more');
        if (!show) { if (btn) btn.remove(); return; }
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'guide-load-more'; btn.type = 'button'; btn.className = 'guide-load-more-btn';
            btn.addEventListener('click', () => { currentPage++; renderGuide(); try { guideEventsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(e) {} });
            if (guideEventsContainer.parentNode) guideEventsContainer.parentNode.insertBefore(btn, guideEventsContainer.nextSibling);
        }
        btn.innerHTML = `<i class="fas fa-chevron-down"></i> Load ${nextLoad} more`;
    }

    /* =========================================================
       17. RENDER PRINCIPAL (con marcador / live badge)
       ========================================================= */
    function renderGuide() {
        if (serverEventsCache.length === 0) {
            guideEventsContainer.innerHTML = `<div class="guide-empty"><i class="fas fa-calendar-plus"></i><p>No events available right now.</p><p style="font-size:0.9rem; opacity:0.7;">Check back later.</p></div>`;
            renderLoadMoreButton(false, 0);
            return;
        }

        let filtered = getFilteredEventsBase();

        if (selectedSport === 'featured') filtered = filtered.filter(ev => ev.featured);
        else if (selectedSport === 'live') filtered = filtered.filter(ev => isLiveEvent(ev));
        else if (selectedSport === 'finished') filtered = filtered.filter(ev => isFinishedEvent(ev));
        else if (selectedSport !== 'all') filtered = filtered.filter(ev => (ev.strSport || 'Other') === selectedSport);

        if (filtered.length === 0) {
            guideEventsContainer.innerHTML = `<div class="guide-empty"><i class="fas fa-search"></i><p>No events match the selected filters.</p></div>`;
            renderLoadMoreButton(false, 0);
            return;
        }

        filtered.sort((a, b) => {
            // Live primero, luego por fecha
            if (isLiveEvent(a) && !isLiveEvent(b)) return -1;
            if (isLiveEvent(b) && !isLiveEvent(a)) return 1;
            const da = parseUtcDate(a), db = parseUtcDate(b);
            if (!da && !db) return 0; if (!da) return 1; if (!db) return -1;
            return da - db;
        });

        const end = currentPage * EVENTS_PER_PAGE;
        const paginated = filtered.slice(0, end);
        const remaining = Math.max(0, filtered.length - end);
        const nextLoad = Math.min(EVENTS_PER_PAGE, remaining);

        const parts = paginated.map(ev => {
            const local = eventToLocal(ev);
            const hasTeams = ev.strHomeTeam && ev.strAwayTeam;
            const homeBadge = localImg(ev.strHomeTeamBadge) || localImg(ev.strThumb) || localImg(ev.strLeagueBadge) || FALLBACK_LOGO;
            const awayBadge = localImg(ev.strAwayTeamBadge) || localImg(ev.strThumb) || localImg(ev.strLeagueBadge) || FALLBACK_LOGO;
            const leagueBadge = localImg(ev.strLeagueBadge) || localImg(ev.strThumb) || FALLBACK_LOGO;
            const streamCount = (ev.streams || []).length;
            const featured = !!ev.featured;
            const sportColor = getSportColor(ev.strSport);
            const watchLabel = streamCount > 1 ? `${streamCount} channels` : 'Watch';
            const liveBadge = getLiveBadge(ev);
            const score = getScoreLabel(ev);

            if (hasTeams) {
                return `
                    <div class="guide-card ${featured ? 'featured' : ''}" style="--sport-color:${sportColor};" data-event-id="${ev.idEvent}">
                        <div class="guide-card-header">
                            <div class="guide-league"><img src="${leagueBadge}" alt="" loading="lazy" decoding="async" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strLeague || 'League')}</span></div>
                            <div class="guide-header-right">
                                ${featured ? '<i class="fas fa-star featured-star" title="Featured event"></i>' : ''}
                                ${liveBadge}
                                <div class="guide-time"><i class="far fa-clock"></i> ${local.time}</div>
                            </div>
                        </div>
                        <div class="guide-teams">
                            <div class="guide-team"><img src="${homeBadge}" alt="" loading="lazy" decoding="async" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strHomeTeam)}</span></div>
                            <div class="guide-vs">${score ? `<span style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${escapeHtml(score)}</span>` : 'VS'}</div>
                            <div class="guide-team"><img src="${awayBadge}" alt="" loading="lazy" decoding="async" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strAwayTeam)}</span></div>
                        </div>
                        <div class="guide-footer">
                            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">${sportBadge(ev.strSport)}</div>
                            <span class="guide-channel"><i class="fas fa-circle-play"></i> ${watchLabel}</span>
                        </div>
                    </div>`;
            } else {
                const title = ev.strEvent || ev.strLeague || 'Event';
                return `
                    <div class="guide-card ${featured ? 'featured' : ''}" style="--sport-color:${sportColor};" data-event-id="${ev.idEvent}">
                        <div class="guide-card-header">
                            <div class="guide-league"><img src="${leagueBadge}" alt="" loading="lazy" decoding="async" onerror="this.src='${FALLBACK_LOGO}'"><span>${escapeHtml(ev.strLeague || 'Event')}</span></div>
                            <div class="guide-header-right">
                                ${featured ? '<i class="fas fa-star featured-star" title="Featured event"></i>' : ''}
                                ${liveBadge}
                                <div class="guide-time"><i class="far fa-clock"></i> ${local.time}</div>
                            </div>
                        </div>
                        <div class="guide-teams guide-teams-single">
                            <div class="guide-team guide-team-single">
                                <img src="${homeBadge}" alt="" loading="lazy" decoding="async" onerror="this.src='${FALLBACK_LOGO}'">
                                <span>${escapeHtml(title)}</span>
                            </div>
                        </div>
                        <div class="guide-footer">
                            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">${sportBadge(ev.strSport)}</div>
                            <span class="guide-channel"><i class="fas fa-circle-play"></i> ${watchLabel}</span>
                        </div>
                    </div>`;
            }
        });
        guideEventsContainer.innerHTML = parts.join('');

        renderLoadMoreButton(remaining > 0, nextLoad);
    }

    /* =========================================================
       18. CLICK EN TARJETA
       ========================================================= */
    guideEventsContainer.addEventListener('click', e => {
        const card = e.target.closest('.guide-card'); if (!card) return;
        const idEvent = card.dataset.eventId;
        const ev = serverEventsCache.find(x => String(x.idEvent) === String(idEvent));
        if (ev) openEventPlayer(ev); else showToast('Event not available');
    });

    /* =========================================================
       19. SEARCH
       ========================================================= */
    const renderGuideDebounced = debounce(renderGuide, 150);
    guideSearchInput.addEventListener('input', () => { guideSearchQuery = guideSearchInput.value; currentPage = 1; renderSidebarSports(); renderGuideDebounced(); });

    /* =========================================================
       20. REFRESH
       ========================================================= */
    guideRefreshBtn.addEventListener('click', async () => {
        await syncLivescores();
        await fetchServerEvents();
        currentPage = 1;
        renderSidebarSports(); renderSidebarDates(); renderGuide();
        showToast('Guide updated');
    });

    /* =========================================================
       21. BROADCAST + INIT + POLLING
       ========================================================= */
    const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('xuper_sync') : null;
    let lastDayKey = todayKey();

    (async function init() {
        await syncLivescores();
        await fetchServerEvents();

        if (autoEventId) {
            const ev = serverEventsCache.find(x => String(x.idEvent) === String(autoEventId));
            if (ev) openEventPlayer(ev);
            else document.body.innerHTML = `<div style="display:flex; height:100vh; align-items:center; justify-content:center; color:#f8fafc; background:#0f1115; font-family:sans-serif;">Event not found or unavailable.</div>`;
            return;
        }

        selectedDate = todayKey();
        currentPage = 1;

        renderSidebarSports();
        renderSidebarDates();
        renderGuide();

        if (bc) {
            bc.onmessage = async (msg) => {
                if (msg.data && msg.data.t === 'updated') {
                    const ok = await fetchServerEvents();
                    if (ok) { currentPage = 1; renderSidebarSports(); renderSidebarDates(); renderGuide(); }
                }
            };
        }

        // Polling cada 2 minutos: sincroniza livescores y recarga
        setInterval(async () => {
            if (document.visibilityState !== 'visible') return;
            await syncLivescores();
            const ok = await fetchServerEvents();
            if (ok) {
                renderSidebarSports();
                renderSidebarDates();
                renderGuide();
            }
        }, SYNC_INTERVAL_MS);

        // Cambio de día
        setInterval(async () => {
            if (document.visibilityState !== 'visible') return;
            const newKey = todayKey();
            if (newKey !== lastDayKey) {
                lastDayKey = newKey;
                await syncLivescores();
                await fetchServerEvents();
                selectedDate = newKey;
                currentPage = 1;
                renderSidebarSports(); renderSidebarDates(); renderGuide();
            }
        }, 60000);
    })();
});