/////////////////////////
//가상 모듈만들기 
function useVirtualState(){
    return {
        foo : 'russell',
        bar : 70,
        pi : 3.14,
        adder : function(a,b){
            return a + b
        }
    }
}
const {foo,bar,adder} = useVirtualState() // foo,bar,adder 만 가져오기

console.log(foo,bar)

console.log(adder(1,2))