async function renderMain({ baseUrl }) {

    console.log(baseUrl)

    document.querySelector('h1').innerText = 'Hello'

}


document.addEventListener("DOMContentLoaded", function () {

    if (window.location.hostname === "") {
        renderMain({
            baseUrl: 'localhost'
        })
    }
    else {
        renderMain({
            baseUrl: window.location.hostname
        })
    }

});

