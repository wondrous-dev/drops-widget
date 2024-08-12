const closeIcon = () => {
  const node = document.createElement('svg');
  node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  node.setAttribute('width', '13');
  node.setAttribute('height', '13');
  node.setAttribute('viewBox', '0 0 13 13');
  node.setAttribute('fill', 'none');

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('cx', '6.5');
  circle.setAttribute('cy', '6.5');
  circle.setAttribute('r', '6');
  circle.setAttribute('stroke', 'black');
  node.appendChild(circle);

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M4 4L9 9');
  path1.setAttribute('stroke', 'black');
  node.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M9 4L4 9');
  path2.setAttribute('stroke', 'black');
  node.appendChild(path2);

  return node;
};

const detectClickOutside = (el, button, callback) => {
  const handleClickOutside = (event) => {
    if (!el.contains(event.target) && !button.contains(event.target)) {
      callback();
    }
  };
  document.addEventListener('click', handleClickOutside);
  return {
    destroy() {
      document.removeEventListener('click', handleClickOutside);
    },
  };
};

const renderIframe = (url, container) => {
  const iframeExists = container.querySelector('#drops-widget-iframe');

  if (iframeExists) {
    container.style.display = 'block';
    container.style.zIndex = 100;
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'drops-widget-iframe';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';

  iframe.src = url;
  container.style.width = '100vw';
  container.style.height = '100vh';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.transformOrigin = 'top left';
  container.appendChild(iframe);
};

const hideIframeContainer = (container) => {
  const iframe = document.querySelector('#drops-widget-iframe');
  if (iframe) {
    container.style.display = 'none';
    container.style.zIndex = 0;
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
};

const createCloseWidgetButton = ({
  button,
  hideIframeContainer,
  setIsIframeRendered,
}) => {
  const closeButton = document.createElement('button');
  closeButton.style.height = '16px';
  closeButton.style.width = '16px';
  closeButton.style.border = 'none';
  closeButton.style.backgroundColor = 'transparent';
  closeButton.style.cursor = 'pointer';
  closeButton.innerText = 'x';
  closeButton.style.fontSize = '12px';
  closeButton.style.borderRadius = '400px';
  closeButton.style.padding = '5px';
  closeButton.style.lineHeight = '15px';
  closeButton.style.display = 'flex';
  closeButton.style.justifyContent = 'center';
  closeButton.style.alignItems = 'center';
  closeButton.style.border = '1px solid #000';
  closeButton.style.color = '#000';
  closeButton.onmouseover = () => {
    closeButton.style.backgroundColor = '#000';
    closeButton.style.color = '#FFF';
  };
  closeButton.onmouseleave = () => {
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#000';
  };
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const container = document.getElementById('drops-widget-container');
    if (container.style.display === 'none') {
      button.style.display = 'none';
      sessionStorage.setItem('drops-widget-closed', 'true');
    } else {
      container.style.display = 'none';
      container.style.zIndex = 0;
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      hideIframeContainer(container);
      setIsIframeRendered();
    }
  });
  button.appendChild(closeButton);
};

const createButtonElement = ({ hideIframeContainer, setIsIframeRendered }) => {
  const button = document.createElement('button');

  button.style.position = 'fixed';
  button.style.zIndex = 101;
  button.style.top = 'calc(100% - 100px)';
  button.style.left = 'calc(100% - 180px)';
  button.style.borderRadius = '6px';
  button.style.border = '1px solid #000';
  button.style.backgroundColor = '#FFF';
  button.style.boxShadow = '0px 4px 4px 0px rgba(0, 0, 0, 0.25)';
  button.style.maxWidth = '155px';
  button.style.height = '48px';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.cursor = 'pointer';
  button.style.whiteSpace = 'nowrap';
  button.style.color = '#000';
  button.style.fontFamily = 'Jost, sans-serif';
  button.style.fontStyle = 'italic';
  button.style.fontWeight = '800';
  button.style.fontSize = '15px';
  button.innerText = 'ENTER TO WIN';
  button.style.width = '100%';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.gap = '10px';
  createCloseWidgetButton({ button, hideIframeContainer, setIsIframeRendered });
  return button;
};

const handleButton = ({ container }) => {
  let isIframeRendered = false;
  const setIsIframeRendered = () => (isIframeRendered = !isIframeRendered);
  const button = createButtonElement({
    hideIframeContainer,
    setIsIframeRendered,
  });

  detectClickOutside(container, button, () => {
    isIframeRendered = !isIframeRendered;
    hideIframeContainer(container);
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (isIframeRendered) {
      hideIframeContainer(container);
    } else {
      const iframe = document.querySelector('#drops-widget-iframe');
      if (iframe) {
        container.style.display = 'block';
        container.style.zIndex = 100;
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
      }
    }
    isIframeRendered = !isIframeRendered;
  };

  button.addEventListener('click', handleClick);
  document.body.appendChild(button);
};

const renderWidget = () => {
  const script = document.getElementById('drops-widget-script');

  const container = document.createElement('div');
  container.style.overflow = 'hidden';
  container.id = 'drops-widget-container';
  container.style.display = 'none';
  container.style.zIndex = 0;
  const url = script.getAttribute('data-drops-widget');
  document.body.appendChild(container);
  renderIframe(url, container);
  document.head.insertAdjacentHTML(
    'beforeend',
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">'
  );
  setTimeout(() => {
    handleButton({ container });
  }, 1000);
};

renderWidget();
