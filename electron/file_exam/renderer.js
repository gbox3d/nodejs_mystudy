
function renderMain({fs})
{
    document.querySelector('#btn-file-test').addEventListener('click',(evt)=>{

        // console.log(lo)

        const _out = document.getElementById('output');
        fs.readFile("../res/test.txt",{
            encoding : 'utf8'
        })
        .then(_=> {
            _out.innerText = _;
        })
        .catch(e=> {
            _out.innerText = err.message;

        })
    
    });

}

globalThis.renderMain = renderMain



