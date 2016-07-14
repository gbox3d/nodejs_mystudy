/**
 * Created by gunpower on 2015. 11. 3..
 */

var net = require('net')
var    repl = require('repl')
var    connections = 0;

var theApp = {
    testMsg : 'hello repl'
}

var repl_context = repl.start({
    prompt: 'Node.js via stdin> ',
    input: process.stdin,
    output: process.stdout
}).context;

//콘텍스트객체 설정
//theApp을 repl에서 볼수있다
repl_context.theApp = theApp;