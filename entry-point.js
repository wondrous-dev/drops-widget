console.log('test');
const handleInit = () => {
  let e = document.createElement('iframe'),
    t = document.getElementById('drops-widget-script'),
    d = t.getAttribute('data-drops-widget');
  (e.src = d),
    (e.style.width = '60vw'),
    (e.style.height = '60vh'),
    (e.frameborder = '0'),
    (e.style.border = '1px solid black'),
    (e.style.borderRadius = '10px');
  let l = document.createElement('div');
  (l.id = 'drops-widget-container'),
    (l.style.position = 'fixed'),
    (l.style.width = 'fit-content'),
    (l.style.top = '25%'),
    (l.style.left = '50%'),
    (l.style.padding = '20px'),
    (l.style.transform = 'translate(-50%, 0)'),
    l.appendChild(e),
    document.body.appendChild(l);
};
handleInit();

/*
    USAGE: 
   <script
      id="drops-widget-script"
      data-drops-widget="<ENTER DROPS APP URL LINK HERE WITH THE EXTERNAL ID. e.g https://app.drops.house/?ext_id=abc>"
      src"<ENTER SCRIPT URL HERE>"
    ></script>
*/
