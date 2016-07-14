/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 3. 20.
 * Time: 오후 3:35
 * To change this template use File | Settings | File Templates.
 */

//전역변수로 선언
var mTestval = 'goorume'

hello = require('./hello');



console.log(hello.mTestval);

hello.world();


//hello 모듈에서 같은 이름의 변수를 사용하더라도 영향을 받지 않는다.
console.log(mTestval);
console.log(global.mTestval);