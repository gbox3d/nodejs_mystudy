import axios from 'axios';

(async function() {
    try {
        let res = await axios.get('http://localhost:8080/echo?msg="hey axios"');

        console.log(res.status);
        console.log(res.data);

    }
    catch(e) {
        console.log(e);
    }
})();
