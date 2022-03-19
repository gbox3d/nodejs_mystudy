import {incCount} from "./sub_module"
import { printCount } from "./sub_module2"
import {initStore} from './appuex'

//전역 변수 초기화
let theApp = initStore({
    name : 'theApp',
    count : 0
})
// let theApp = useStore()
incCount() //store 의 카운터 값 변경 
incCount()
console.log(theApp.count) //전역 변수 구현 

printCount()





