import axios from 'axios';

// axios.post('http://localhost:8080/echo',
//     "hello axios"
//     )
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

axios({
    method:'POST',
    url:'http://localhost:8080/echo',
    data : 'hello axios',
    headers:{
        'my-header' : 'axios/test'
    }
}).then(_=> {
    console.log(_)
})