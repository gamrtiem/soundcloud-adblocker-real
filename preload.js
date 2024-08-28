const arg = process.argv.filter(p => p.indexOf("--customValue=") >= 0)[0];
const argValue = arg.substr(arg.indexOf("=") + 1);

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }


  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.id = "customCSS";
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'file://' + argValue;
  link.media = 'all';
  head.appendChild(link);

  console.log(argValue)
})

window.addEventListener('DOMContentLoaded', async () => {
  // manipulate DOM here

  // adding css
  //const head = document.getElementsByTagName('head')[0];
  //const link = document.createElement('link');
  //link.id = "AB";
  //link.rel = 'stylesheet';
  //link.type = 'text/css';
  //link.href = 'main.css';

  //link.media = 'all';
  //head.appendChild(link);

  // removing the current css
  // here you can do whatever you want
})
