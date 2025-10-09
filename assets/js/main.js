// Mobile nav toggle + small helpers
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav open/close
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close menu when clicking a link (mobile)
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Blog preview on homepage (if the container exists)
  const preview = document.getElementById('blog-preview');
  if (preview) {
    fetch('data/posts.json', { cache: 'no-store' })
      .then(r => r.json())
      .then(posts => {
        posts
          .sort((a,b) => new Date(b.date) - new Date(a.date))
          .slice(0,3)
          .forEach((p, idx) => {
            const d = new Date(p.date);
            const el = document.createElement('article');
            el.className = 'post-item' + (idx === 0 ? ' first' : '');
            el.innerHTML = `
              <h2 class="post-title"><a href="article.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h2>
              <div class="post-meta">${d.toLocaleDateString()}</div>
              ${p.summary ? `<p class="post-summary">${p.summary}</p>` : ''}
              <div class="post-actions">
                <a class="btn" href="article.html?slug=${encodeURIComponent(p.slug)}" aria-label="Read: ${p.title}">Read</a>
              </div>
            `;
            preview.appendChild(el);
          });
      })
      .catch(err => {
        preview.innerHTML = '<p>Unable to load posts.</p>';
        console.error(err);
      });
  }

  // ============================
  // Use Cases: Personal/Business segmented toggle
  // ============================
  const segment = document.querySelector('.segment');
  if (segment) {
    const buttons = Array.from(segment.querySelectorAll('.segment-btn'));
    const panels = {
      personal: document.getElementById('panel-personal'),
      business: document.getElementById('panel-business'),
    };

    // ---- Equalize panel heights (prevents jump when switching) ----
    function setEqualPanelHeights() {
      const els = Object.values(panels).filter(Boolean);
      if (els.length < 2) return;

      // Remember which panels were hidden
      const hiddenState = new Map(els.map(el => [el, el.classList.contains('is-hidden')]));

      // Temporarily show all to measure natural heights
      els.forEach(el => el.classList.remove('is-hidden'));
      // Clear previous min-heights first
      els.forEach(el => { el.style.minHeight = ''; });

      const maxH = Math.max(...els.map(el => el.getBoundingClientRect().height));
      const h = Math.ceil(maxH);
      els.forEach(el => { el.style.minHeight = `${h}px`; });

      // Restore original visibility
      hiddenState.forEach((wasHidden, el) => el.classList.toggle('is-hidden', wasHidden));
    }

    function show(kind) {
      if (!panels[kind]) kind = 'personal';

      // Toggle button states
      buttons.forEach(btn => {
        const active = btn.dataset.target === kind;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });

      // Toggle panels
      Object.entries(panels).forEach(([k, el]) => {
        if (!el) return;
        el.classList.toggle('is-hidden', k !== kind);
      });

      // Reflect state in the hash
      if (location.hash !== `#${kind}` && history.replaceState) {
        history.replaceState(null, '', `#${kind}`);
      }

      // Equalize heights after every toggle
      setEqualPanelHeights();
    }

    // Click handling
    segment.addEventListener('click', (e) => {
      const btn = e.target.closest('.segment-btn');
      if (!btn) return;
      show(btn.dataset.target);
    });

    // Initialize from URL hash (#business or #personal)
    const hash = (location.hash || '').slice(1);
    show(hash === 'business' ? 'business' : 'personal');

    // Recompute on load (images/fonts) and on resize (debounced)
    window.addEventListener('load', setEqualPanelHeights);
    window.addEventListener('resize', (() => {
      let t;
      return () => { clearTimeout(t); t = setTimeout(setEqualPanelHeights, 120); };
    })());
  }
});
