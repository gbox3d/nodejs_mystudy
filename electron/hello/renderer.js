function renderMain() {
    setTimeout(() => {
        document.getElementById('hello-msg').innerText = "render loop connect success";
        document.getElementById('hello-msg').style.color = 'red'

    }, 1000)

}

module.exports = renderMain