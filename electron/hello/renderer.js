function renderMain({process}) {
    setTimeout(() => {

        document.getElementById('node-version').innerText = process.versions.node
        document.getElementById('chrome-version').innerText = process.versions.chrome
        document.getElementById('electron-version').innerText = process.versions.electron;

        document.getElementById('hello-msg').innerText = "render loop connect success";
        document.getElementById('hello-msg').style.color = 'red'

    }, 1000)

    document.getElementById('btn-fs-exam').addEventListener('click',()=> {
        location.href = '../file_exam/index.html'
    });


}

globalThis.renderMain = renderMain

// module.exports = renderMain