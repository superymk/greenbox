'use strict';

(function () {
  // Because this file is loaded with `defer`, it runs after:
  // 1) HTML parsing is complete
  // 2) earlier deferred scripts (like marked.min.js) have executed

  const titleEl = document.getElementById('article-title');
  const metaEl = document.getElementById('article-meta');
  const contentEl = document.getElementById('article-content');

  function setErrorState(err) {
    if (titleEl) titleEl.textContent = 'Not found';
    if (metaEl) metaEl.textContent = '';
    if (contentEl) contentEl.innerHTML = '<p>Sorry, we could not load this article.</p>';
    // Log the real reason so you can debug quickly
    console.error('[article-loader] Failed to load article:', err);
  }

  function isAbsoluteUrl(url) {
    return (
      !url ||
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('mailto:') ||
      url.startsWith('/') ||
      url.startsWith('#') ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    );
  }

  function fixRelativeUrls(rootEl) {
    if (!rootEl) return;

    const prefix = 'articles/'; // where your .md and its assets live

    // Fix src on media elements
    rootEl.querySelectorAll('img, video, audio, source').forEach((el) => {
      const src = el.getAttribute('src');
      if (src && !isAbsoluteUrl(src)) {
        el.setAttribute('src', prefix + src);
      }

      // Optional: handle srcset on images/sources if you ever use it in markdown HTML
      const srcset = el.getAttribute('srcset');
      if (srcset) {
        const fixed = srcset
          .split(',')
          .map((part) => part.trim())
          .map((part) => {
            // "image.png 2x" or "image.png 640w"
            const pieces = part.split(/\s+/);
            const u = pieces[0];
            if (!u || isAbsoluteUrl(u)) return part;
            pieces[0] = prefix + u;
            return pieces.join(' ');
          })
          .join(', ');
        el.setAttribute('srcset', fixed);
      }
    });

    // Fix href on links (only within the article body)
    rootEl.querySelectorAll('a').forEach((el) => {
      const href = el.getAttribute('href');
      if (href && !isAbsoluteUrl(href)) {
        el.setAttribute('href', prefix + href);
      }
    });
  }

  async function fetchJson(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${url} HTTP ${res.status}`);
    return res.json();
  }

  async function fetchText(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${url} HTTP ${res.status}`);
    return res.text();
  }

  async function loadArticle() {
    try {
      // Basic DOM presence checks
      if (!titleEl || !metaEl || !contentEl) {
        throw new Error('Missing #article-title, #article-meta, or #article-content in DOM');
      }

      // Ensure Marked is available (race-free with defer ordering, but check anyway)
      if (!window.marked || typeof window.marked.parse !== 'function') {
        throw new Error('Marked is not loaded (window.marked.parse missing)');
      }

      const params = new URLSearchParams(window.location.search);
      const slug = params.get('slug');
      if (!slug) throw new Error('Missing ?slug=...');

      const posts = await fetchJson('data/posts.json');
      const post = posts.find((p) => p.slug === slug);
      if (!post) throw new Error(`Post not found for slug="${slug}"`);

      titleEl.textContent = post.title || slug;

      const author = post.author || 'GreenBox Team';

      // Treat YYYY-MM-DD as local date (avoid UTC shift)
      const dateObj = post.date ? new Date(post.date + 'T00:00:00') : null;
      const formattedDate = dateObj && !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
        : '';

      metaEl.textContent = formattedDate ? `${author} · ${formattedDate}` : `${author}`;

      const mdUrl = `articles/${encodeURIComponent(slug)}.md`;
      const md = await fetchText(mdUrl);

      // Render markdown
      contentEl.innerHTML = window.marked.parse(md);

      // Fix relative paths in rendered HTML
      fixRelativeUrls(contentEl);
    } catch (err) {
      setErrorState(err);
    }
  }

  // Run immediately (defer ensures DOM + marked are ready)
  loadArticle();
})();
