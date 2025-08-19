const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load theme from localStorage or system
const saved = localStorage.getItem('theme');
if (saved) {
    html.setAttribute('data-theme', saved);
    toggleBtn.textContent = saved === 'dark' ? '🌞' : '🌙';
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '🌞';
}

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggleBtn.textContent = next === 'dark' ? '🌞' : '🌙';
});
