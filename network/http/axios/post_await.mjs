import axios from 'axios';

try {
    let res = await axios({
        method:'POST',
        url:'http://localhost:8080/echo',
        data : 'hello axios',
        headers:{
            'my-header' : 'axios/test'
        }
    });

    console.log(res.status)
    console.log(res.data)
}
catch(e) {
    console.log(e)
}
finally {
    console.log('complete')
}
