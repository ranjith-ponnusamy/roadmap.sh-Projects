document.addEventListener('DOMContentLoaded', () => {
  const tablist = document.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function getPanel(tab) {
    const id = tab.getAttribute('aria-controls');
    return document.getElementById(id);
  }

  function activateTab(tab, { setFocus = true } = {}) {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => p.hidden = true);

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    const panel = getPanel(tab);
    if (panel) panel.hidden = false;
    if (setFocus) tab.focus();
  }

  function focusByIndex(idx) {
    const next = tabs[(idx + tabs.length) % tabs.length];
    next.focus();
  }

  // Click to activate
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault();
          focusByIndex(i + 1);
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          focusByIndex(i - 1);
          break;
        }
        case 'Home': {
          e.preventDefault();
          tabs[0].focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          activateTab(document.activeElement);
          break;
        }
      }
    });
  });

  const initiallySelected = tabs.find(t => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
  if (initiallySelected) activateTab(initiallySelected, { setFocus: false });
});
