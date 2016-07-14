/**
 * Created by gbox3d on 2014. 1. 30..
 */

function somebody(option) {

    var name = option.name;
    var age = option.age;
    var job = option.job;

    this.getName = function() {
        return name;
    }
    this.age = age;

}

somebody.prototype.incAge = function() {
    this.age++;
}

module.exports.somebody = somebody;