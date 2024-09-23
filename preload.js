const getDir = process.argv.filter(p => p.indexOf("--customValue=") >= 0)[0];
const Dir = getDir.substr(getDir.indexOf("=") + 1);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }


  const head = document.getElementsByTagName('head')[0];
  const body = document.getElementsByTagName('body')[0];
  const link = document.createElement('link');
  link.id = "customCSS";
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'atom://' + Dir + '/main.css';
  link.media = 'all';
  head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'atom://' + Dir + '/soundcloudShuffleLikes.js';
  script.id = 'customJS';
  script.type = 'text/javascript';

  const script2 = document.createElement('script');
  script2.src = 'atom://' + Dir + '/soundcloudThemes.js';
  script2.id = 'customJS';
  script2.type = 'text/javascript';

  sleep(1000).then(() => {    head.appendChild(script);  });
  sleep(1000).then(() => {    head.appendChild(script2);  });

  //const script2 = document.createElement('script');
  //script2.src = 'file:' + Dir + '/playlistButtonsV3.js';
  //head.appendChild(script2);



  //script.src = 'file://' + argValue3 + '/privacyRedirector.js';
  //head.appendChild(script);



  console.log(Dir)
})

