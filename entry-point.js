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
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'drops-widget-iframe';
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';

  iframe.src = url;
  container.style.width = '100vw';
  container.style.height = '100vh';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '10px';
  iframe.style.transformOrigin = 'top left';
  container.appendChild(iframe);
};

const removeIframe = (container) => {
  const iframe = document.querySelector('#drops-widget-iframe');
  if (iframe) {
    container.style.display = 'none';

    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
};

const createButtonElement = () => {
  const button = document.createElement('button');
  button.style.position = 'fixed';
  button.style.top = 'calc(100% - 100px)';
  button.style.left = 'calc(100% - 100px)';
  button.style.borderRadius = '50%';
  button.style.border = '1px solid #000';
  button.style.backgroundColor = '#000';
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.padding = '5px';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.cursor = 'pointer';
  return button;
};

const renderWidget = () => {
  let isIframeRendered = false;
  const script = document.getElementById('drops-widget-script');

  const button = createButtonElement();
  const img = document.createElement('img');
  img.src = 'https://omni.drops.house/logo-2.svg';
  img.style.height = '50px';
  img.style.width = '50px';
  button.appendChild(img);

  const container = document.createElement('div');
  container.style.overflow = 'hidden';
  container.id = 'drops-widget-container';
  const url = script.getAttribute('data-drops-widget');

  document.body.appendChild(container);
  detectClickOutside(container, button, () => {
    isIframeRendered = !isIframeRendered;
    removeIframe(container);
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (isIframeRendered) {
      removeIframe(container);
    } else {
      renderIframe(url, container);
    }

    isIframeRendered = !isIframeRendered;
  };

  button.addEventListener('click', handleClick);
  document.body.appendChild(button);
};

// CSS for animations
const style = document.createElement('style');

document.head.appendChild(style);
renderWidget();
