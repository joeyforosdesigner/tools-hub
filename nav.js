(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a href="/" class="nav-logo">
      <span class="nav-logo-dot"></span>
      ToolsHub
    </a>
    <div class="nav-right">
      <ul class="nav-links">
        <li><a href="/#categories">Tools</a></li>
        <li><a href="/#featured">Featured</a></li>
        <li><a href="/#about">About</a></li>
      </ul>
      <button class="theme-toggle" id="themeToggle">🌙</button>
    </div>
  `;
  document.body.prepend(nav);

  const btn = document.getElementById('themeToggle');
  btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    btn.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', next);
  });
})();