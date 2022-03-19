import {useStore} from './appuex.js'
const app = useStore() //전역 변수 얻어오기

function printCount() {
    console.log(`count : ${app.count}`)
}

export {
    printCount
}