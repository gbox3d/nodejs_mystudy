
function renderMain({ fs }) {
    document.querySelector('#btn-file-test').addEventListener('click', (evt) => {

        // console.log(lo)

        const _out = document.getElementById('output');
        fs.readFile("../res/test.txt", {
            encoding: 'utf8'
        }, (err, _) => {

            if (err) {
                _out.innerText = err;

            }
            else
                _out.innerText = _;

        })


    });

}

globalThis.renderMain = renderMain



