/**
 * Created by gunpower on 2015. 10. 22..
 */

/*
이 예제는 리눅스에서만 동작함 (라즈베리에서도 실행 확인)

-설치방법
 git clone https://github.com/risacher/input-event
 npm install --save input-event

콘솔접속으로는 간접으로는 제대로 실행이되지않고 직접로그인했을때 제대로 작동된다

 */
var input_event = require('input-event');

var k = new input_event('event0'); // 'event0' is the file corresponding to my keyboard in /dev/input/
k.on('keyup', console.log);
k.on('keydown', console.log);
k.on('keypress', console.log);
k.on('rel', console.log);
k.on('abs', console.log);
k.on('syn', console.log);