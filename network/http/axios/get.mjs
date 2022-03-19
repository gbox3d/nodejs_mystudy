import axios from 'axios';

axios.get('http://localhost:8080/echo?msg="hey axios"').then((Response)=>{
    console.log(Response.data);
}).catch((Error)=>{
    console.log(Error);
})