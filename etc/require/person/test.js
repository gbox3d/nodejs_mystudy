/**
 * Created by gbox3d on 2014. 1. 30..
 */

var Person = require('./person');

var somebody = new Person.somebody(
    {
        name : 'lee',
        job : 'programmer',
        age : 44
    }
);

console.log(somebody.getName());
somebody.incAge();

console.log(somebody.age);