import {useStore} from './appuex.js'

const app = useStore() //전역 변수 얻어오기

console.log('check point 1')

const foo = ()=> {
    console.log('check point 2')
    console.log(`count : ${app.count}`)
}

const incCount = ()=> {
    app.count++;
}

export {foo,incCount}
