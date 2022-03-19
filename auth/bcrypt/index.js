import bcrypt from 'bcrypt';

//https://www.npmjs.com/package/bcrypt
//사용자 패스워드를 디비에 저장할때 사용 

let myPlaintextPassword = '1234';
let saltRounds = 10; //같은 암호라도 다른 해쉬값이 생기도록 양념을 더하는 숫자 , 이것이 빠지면 같은암호는 항상 같은 해쉬값이나와서 암호를 유추할수있다.

//sync example
//암호화
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);

if(bcrypt.compareSync(myPlaintextPassword, hash) ) {
    console.log('same');
}
else {
    console.log('not same');
}


//promise example
async function example() {
    try {

        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
        console.log(hash);
        
        if(await bcrypt.compare(myPlaintextPassword, hash) ) {
            console.log('same');
        }
        else {  
            console.log('not same');
        }
    } catch (err) {
        console.error(err)
    }
}

example();
