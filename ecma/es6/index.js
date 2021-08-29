import {incCount} from "./sub_module.js" //nodejs 는 반드시 뒤에 js를 붙여 주어야한다.
import {initStore} from './appuex.js'


//전역 변수 초기화
let theApp = initStore({
    name : 'theApp',
    count : 0
})

// let theApp = useStore()

incCount() //store 의 카운터 값 변경 
incCount()


console.log(theApp.count) //전역 변수 구현 


