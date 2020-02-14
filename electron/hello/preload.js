// const renderMain = require('./renderer')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {


  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }


  console.log('start preload... ', document.body.dataset.appname)
  console.log('call render module')

  switch (document.body.dataset.appname) {
    case 'hello':
      {
        renderMain({
          process: process
        });

      }
      break;
    case 'file-exam':
      {
        const fs = require('fs')
        renderMain({
          process: process,
          fs: fs
        });

      }
      break;
  }



})
