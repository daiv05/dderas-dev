import { nextTick } from 'vue';

const COPY_RESET_MS = 1200;

const getCodeTextFromButton = (buttonEl) => {
  const block = buttonEl.closest('.md-code-block');
  if (!block) return '';
  const code = block.querySelector('pre code') || block.querySelector('code');
  if (!code) return '';
  return code.textContent || '';
};

const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const setCopyButtonState = (btn, state) => {
  const iconCopy = btn.querySelector('.icon-copy');
  const iconCopied = btn.querySelector('.icon-copied');

  if (state === 'copied') {
    if (iconCopy) iconCopy.style.display = 'none';
    if (iconCopied) iconCopied.style.display = 'block';
    btn.dataset.state = 'copied';
  } else {
    if (iconCopy) iconCopy.style.display = 'block';
    if (iconCopied) iconCopied.style.display = 'none';
    delete btn.dataset.state;
  }
};

const enhanceCodeTabs = (root = document) => {
  const containers = root.querySelectorAll('.md-code-tabs');

  containers.forEach((container) => {
    if (container.dataset.enhanced === '1') return;

    const tabs = Array.from(container.querySelectorAll(':scope > .md-code-tab'));
    if (tabs.length <= 1) {
      container.dataset.enhanced = '1';
      return;
    }

    const header = document.createElement('div');
    header.className = 'md-code-tabs__header';

    const panels = document.createElement('div');
    panels.className = 'md-code-tabs__panels';

    tabs.forEach((tab, i) => {
      const title = tab.getAttribute('data-title') || `Tab ${i + 1}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'md-code-tabs__tab';
      btn.textContent = title;

      btn.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        header
          .querySelectorAll('.md-code-tabs__tab')
          .forEach((b) => b.classList.remove('is-active'));
        tab.classList.add('is-active');
        btn.classList.add('is-active');
      });

      header.appendChild(btn);
      panels.appendChild(tab);

      if (i === 0) {
        tab.classList.add('is-active');
        btn.classList.add('is-active');
      }
    });

    container.prepend(header);
    container.appendChild(panels);
    container.dataset.enhanced = '1';
  });
};

export const initMarkdownEnhancements = (router) => {
  if (!window.__mdEnhancementsInstalled) {
    window.__mdEnhancementsInstalled = true;

    document.addEventListener('click', async (e) => {
      const btn = e.target?.closest?.('.md-code-copy');
      if (!btn) return;

      const text = getCodeTextFromButton(btn);
      const ok = await copyToClipboard(text);

      setCopyButtonState(btn, ok ? 'copied' : 'idle');
      window.setTimeout(() => setCopyButtonState(btn, 'idle'), COPY_RESET_MS);
    });
  }

  const run = async () => {
    await nextTick();
    enhanceCodeTabs(document);
  };

  run();

  if (router?.afterEach) {
    router.afterEach(() => {
      run();
    });
  }
};
