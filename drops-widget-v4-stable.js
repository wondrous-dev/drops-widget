const isMobile = window.innerWidth <= 768;

const createPostHogScript = () => {
  const posthogScript = document.createElement('script');
  posthogScript.innerHTML = `
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_9rwob2cp20Q6vRE2opca3y4H23OitHNpgCHAoQM2WXw', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'always'
    });
  `;
  document.head.appendChild(posthogScript);
  posthog.capture('widget_loaded');
};

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
  container.style.height = '100dvh';
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
  closeButton.style.position = 'absolute';
  closeButton.style.right = '15px';
  closeButton.style.marginLeft = '20px';
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
      posthog.capture('widget_dismissed');
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
  button.style.top = 'calc(100% - 90px)';
  button.style.left = isMobile ? 'calc(100% - 345px)' : 'calc(100% - 475px)';
  button.style.borderRadius = '6px';
  button.style.border = '1px solid #000';
  button.style.backgroundColor = '#FFF';
  button.style.boxShadow = '0px 4px 4px 0px rgba(0, 0, 0, 0.25)';
  button.style.maxWidth = isMobile ? '250px' : '380px';
  button.style.height = '68px';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  button.style.cursor = 'pointer';
  button.style.lineHeight = '20px';
  button.style.whiteSpace = 'nowrap';
  button.style.color = '#000';
  button.style.fontFamily = 'Libre Baskerville, serif';
  button.style.fontWeight = '800';
  button.style.fontSize = '14px';
  button.style.textAlign = 'center';
  button.innerText = isMobile
    ? 'Enter to win prizes!'
    : 'Enter to win 4 Sun Catchers of your choice';
  button.style.width = '100%';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.paddingRight = '30px';
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
    if (isIframeRendered && container?.style?.display === 'block') {
      posthog.capture('widget_closed');
    }
    isIframeRendered = !isIframeRendered;
    hideIframeContainer(container);
  });

  const handleClick = (e) => {
    e.preventDefault();
    let chatApp = document.querySelector('chat-app');

    if (isIframeRendered) {
      if (chatApp) {
        chatApp.style.display = 'block';
      }
      posthog.capture('widget_closed');
      hideIframeContainer(container);
      button.innerText = isMobile
        ? 'Enter to win prizes!'
        : 'Enter to win 4 Sun Catchers of your choice';
      button.style.fontSize = '14px';
      button.style.height = '68px';
      button.style.top = 'calc(100% - 90px)';
      button.style.width = isMobile ? '250px' : '380px';
      button.style.left = isMobile
        ? 'calc(100% - 345px)'
        : 'calc(100% - 475px)';

      button.style.paddingRight = '30px';
      createCloseWidgetButton({
        button,
        hideIframeContainer,
        setIsIframeRendered,
      });
    } else {
      const iframe = document.querySelector('#drops-widget-iframe');
      if (iframe) {
        if (chatApp) {
          chatApp.style.display = 'none';
        }
        posthog.capture('widget_opened');
        button.innerText = isMobile ? 'ⓧ' : 'Take me back to the shop';
        button.style.width = isMobile ? '44px' : '250px';
        button.style.left = isMobile
          ? 'calc(100% - 100px)'
          : 'calc(100% - 280px)';
        button.style.height = isMobile ? '44px' : '68px';
        button.style.fontSize = isMobile ? '24px' : '14px';

        button.style.top = isMobile
          ? 'calc(100% - 170px)'
          : 'calc(100% - 90px)';
        button.style.left = isMobile
          ? 'calc(100% - 55px)'
          : 'calc(100% - 280px)';
        button.style.paddingLeft = '0px';
        button.style.paddingRight = '0px';
        container.style.display = 'block';
        container.style.zIndex = 100;
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100dvh';
      }
    }
    isIframeRendered = !isIframeRendered;
  };

  button.addEventListener('click', handleClick);
  document.body.appendChild(button);
};

const renderWidget = () => {
  const script = document.getElementById('drops-widget-script');
  createPostHogScript();
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
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">'
  );
  const origin = new URL(url).origin;

  window.addEventListener('message', (event) => {
    if (origin !== event?.origin) return;
    if (event?.data?.type === 'drops_instagram_connect' && event?.data?.url) {
      posthog.capture('instagram_connect_clicked');
      let newWindow = window.open();
      newWindow.location.href = `${origin}/redirect-to?url=${encodeURI(
        event.data.url
      )}#dropsToken=${event?.data?.dropsToken}`;
    }
  });

  setTimeout(() => {
    handleButton({ container });
  }, 1000);
};

renderWidget();
