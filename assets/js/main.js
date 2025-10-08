// Mobile nav toggle + small helpers
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

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
          .forEach(p => {
            const el = document.createElement('article');
            el.className = 'card';
            el.innerHTML = `
              <h3><a href="article.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
              <p class="muted">${new Date(p.date).toLocaleDateString()} · ${p.readingTime || ''}</p>
              <p>${p.summary || ''}</p>
              <div><a class="btn" href="article.html?slug=${encodeURIComponent(p.slug)}">Read</a></div>
            `;
            preview.appendChild(el);
          });
      })
      .catch(err => {
        preview.innerHTML = '<p>Unable to load posts.</p>';
        console.error(err);
      });
  }
});
