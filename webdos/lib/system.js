/**
 * Created by gbox3d on 2014. 1. 31..
 *
 * version : 0.1
 *
 */


var async = require('./async');
var fs = require('fs');
var child_proc = require('child_process');


/*

1. 패스워드를 매번 파일에서 불러오지말고 한번 시작할때 읽고 변경될때만 파일에서 다시 읽게 할것
2. 초기에 패스워드가 설정되지(패스워드파일 존재않함) 않을경우 패스워드필요없이 동작되는 문제수정할것

 */


function fileSystemHelper(option) {

    option = option || {};

    option.root_directory = option.root_directory || 'saveFolder';

    var root_directory = option.root_directory;
    var initial_passwd = option.initial_passwd || '71004';
    var passwd_path = option.passwd_path || './lib/passwd.txt';


    this.caseSetPasswd = function(req_Obj, res){
        try {
            async.waterfall([
                function(callback){
                    fs.readFile(passwd_path, 'utf8',function (err, data) {
                        if (err) {
                            //console.log(err);
                            callback(null, undefined);
                        }else{
                            callback(null, data);
                        }
                    });
                },
                function(passwd, callback){
                    if(passwd == undefined){
                        if(req_Obj.newpass == "" || req_Obj.newpass == undefined){
                            callback(null, initial_passwd);
                        }else{
                            callback(null, req_Obj.newpass);
                        }
                    }else{
                        if(req_Obj.oldpass == undefined){
                            res.end('{"result":"needOldPassword"}');
                        }else{
                            if(passwd == req_Obj.oldpass ){
                                callback(null, req_Obj.newpass)
                            }else{
                                res.end('{"result":"incorrectPassword"}');
                            }
                        }
                    }
                },
                function(realpwd, callback){
                    fs.writeFile(passwd_path, realpwd, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                            res.end('{"result":"setPasswordFail"}');
                        }else{
                            console.log('It\'s setPasswd!');
                            res.end('{"result":"setPasswordOk"}');
                        }
                    });
                }
            ]);
        } catch (exception) {
            console.log('exception = ' + exception);
            res.end('{"result":"systemError"}');
        }
    };


    this.caseSave = function(req_Obj, res){
        try {
            async.waterfall([
                function(callback){
                    fs.readFile(passwd_path, 'utf8',function (err, data) {
                        if (err) {
                            //console.log(err);
                            callback(null, undefined);
                        }else{
                            callback(null, data);
                        }
                    });
                },
                function(passwd, callback){
                    if(passwd == undefined){
                        callback(null);
                    }else{
                        if(passwd == req_Obj.password ){
                            callback(null);
                        }else{
                            res.end('{"result":"incorrectPassword"}');
                        }
                    }
                },
                function(callback){
                    if(req_Obj.path == undefined || req_Obj.path == "" || req_Obj.path == "/"){
                        callback(null,"/");
                    }else{
                        child_proc.exec('mkdir ./'+ root_directory +  req_Obj.path , function(err, stdout, stderr) {
                            callback(null,req_Obj.path + "/");
                        });
                    }
                },
                function(pathData, callback){
                    if(req_Obj.file == undefined || req_Obj.file == "" ){
                        res.end('{"result":"saveOk"}');
                    }else{
                        fs.writeFile( root_directory + '/' + pathData + req_Obj.file, req_Obj.data, 'utf8', function (err) {
                            if (err) {
                                console.log(err);
                                res.end('{"result":"saveFail"}');
                            }else{
                                console.log('It\'s saved!');
                                res.end('{"result":"saveOk"}');
                            }
                        });
                    }
                }
            ]);
        } catch (exception) {
            console.log('exception = ' + exception);
            res.end('{"result":"systemError"}');
        }
    };


    this.caseLoad = function(req_Obj, res){
        try {
            async.waterfall([
                function(callback){
                    fs.readFile(passwd_path, 'utf8',function (err, data) {
                        if (err) {
                            //console.log(err);
                            callback(null, undefined);
                        }else{
                            callback(null, data);
                        }
                    });
                },
                function(passwd, callback){
                    if(passwd == undefined){
                        callback(null);
                    }else{
                        if(passwd == req_Obj.password ){
                            callback(null);
                        }else{
                            res.end('{"result":"incorrectPassword"}');
                        }
                    }
                },
                function(callback){
                    if(req_Obj.path == undefined || req_Obj.path == "" || req_Obj.path == "/"){
                        callback(null,"/");
                    }else{
                        callback(null,req_Obj.path + "/");
                    }
                },
                function(pathData, callback){
                    //fs.readFile('saveFolder/eee/aweq.txt', 'utf8',function (err, data) {
                    fs.readFile(root_directory + pathData + req_Obj.file, 'utf8',function (err, data) {
                        if (err) {
                            console.log(err);
                            res.end('{"result":"loadFail"}');
                        }else{
                            console.log('It\'s loaded!');

//                        var _data = JSON.parse(data);

                            //gbox3d 수정
                            //데이터가 파싱가능하도록 함
                            var out = {
                                result : 'loadOk',
                                data : data
                            };
                            res.end(JSON.stringify(out));

                            //res.end("{'result':'loadOk','data':'"+ data +"'}");
                        }
                    });
                }
            ]);
        } catch (exception) {
            console.log('exception = ' + exception);
            res.end('{"result":"systemError"}');
        }
    };


    this.caseDel = function(req_Obj, res){
        try {
            async.waterfall([
                function(callback){
                    fs.readFile(passwd_path, 'utf8',function (err, data) {
                        if (err) {
                            //console.log(err);
                            callback(null, undefined);
                        }else{
                            callback(null, data);
                        }
                    });
                },
                function(passwd, callback){
                    if(passwd == undefined){
                        callback(null);
                    }else{
                        if(passwd == req_Obj.password ){
                            callback(null);
                        }else{
                            res.end('{"result":"incorrectPassword"}');
                        }
                    }
                },
                function(callback){
                    if(req_Obj.path == undefined || req_Obj.path == "" || req_Obj.path == "/"){
                        callback(null,"/");
                    }else{
                        callback(null,req_Obj.path + "/");
                    }
                },
                function(pathData, callback){
                    fs.exists('./'+ root_directory + pathData + req_Obj.file, function (exists) {
                        if(exists){
                            callback(null, './saveFolder' + pathData + req_Obj.file ,'file')
                        }else{
                            callback(null, './saveFolder' + pathData, 'directory')
                        }
                    });
                },
                function(delName, delType, callback){
                    if(delType == 'directory' && delName == './saveFolder/'){
                        res.end('{"result":"impossibleDelRootFolder"}');
                    }else{
                        child_proc.exec('rm -rf ' + delName , function(err, stdout, stderr) {
                            if(err){
                                console.log(err);
                                res.end('{"result":"' + delType + 'DelFail"}');
                            }else{
                                console.log('It\'s ' + delType + 'del!');
                                res.end('{"result":"' + delType + 'DelOk"}');
                            }
                        });
                    }
                }
            ]);
        } catch (exception) {
            console.log('exception = ' + exception);
            res.end('{"result":"systemError"}');
        }
    };


    this.caseCatalog = function(req_Obj, res){
        try {
            async.waterfall([
                function(callback){
                    fs.readFile(passwd_path, 'utf8',function (err, data) {
                        if (err) {
                            //console.log(err);
                            callback(null, undefined);
                        }else{
                            callback(null, data);
                        }
                    });
                },
                function(passwd, callback){
                    if(passwd == undefined){
                        callback(null);
                    }else{
                        if(passwd == req_Obj.password ){
                            callback(null);
                        }else{
                            res.end('{"result":"incorrectPassword"}');
                        }
                    }
                },
                function(callback){
                    if(req_Obj.path == undefined || req_Obj.path == "" || req_Obj.path == "/"){
                        callback(null,"/");
                    }else{
                        callback(null,req_Obj.path + "/");
                    }
                },
                function(pathData, callback){
                    child_proc.exec('cd '+ root_directory + pathData + ' && ls', function(err, stdout, stderr) {
                        if(err){
                            //console.log(err);
                            res.end('{"result":"notExistDirectory"}');
                        }else{
                            if( stdout.length == 0){
                                res.end('{"result":"emptyFolder"}');
                            }else{
                                callback(null, stdout.split('\n'), pathData);
                            }
                        }
                    });
                },
                function(lists, path, callback){
                    var file_size = [];

                    fileSize(lists, 0);

                    function fileSize(listData, i){
                        fs.stat('./'+ root_directory + path + '/' + listData[i], function (err, stats) {
                            file_size.push({
                                name:listData[i],
                                size:stats.size
                            });
                            var number = parseInt(i);
                            number++;
                            if(number >= listData.length){
                                callback(null, file_size, path)
                            }else{
                                fileSize(listData, number);
                            }
                        });
                    }
                },
                function(addLists, finalPath, callback){
                    var result_data = [];

                    resultData(addLists, 0);

                    function resultData(Data, i){
                        fs.readFile('./' + root_directory + finalPath + '/' + Data[i].name, 'utf8',function (err, data) {
                            if (err) {
                                result_data.push({
                                    name:Data[i].name,
                                    type:1
                                });
                            }else{
                                result_data.push({
                                    name:Data[i].name,
                                    type:0,
                                    size:Data[i].size
                                });
                            }

                            var number = parseInt(i);
                            number++;
                            if(number >= Data.length - 1){
                                callback(null, result_data)
                            }else{
                                resultData(Data, number);
                            }
                        });
                    }
                },
                function(allData, callback){
                    res.end('{"result":"ok","data":' + JSON.stringify(allData) + '}');
                }
            ]);
        } catch (exception) {
            console.log('exception = ' + exception);
            res.end('{"result":"systemError"}');
        }
    };


}


module.exports.fileSystemHelper = fileSystemHelper;


