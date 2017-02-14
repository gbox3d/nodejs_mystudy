/**
 * Created by gunpower on 2016. 10. 25..
 */

var fs = require("fs");

/*
 'r' - Open file for reading. An exception occurs if the file does not exist.

 'r+' - Open file for reading and writing. An exception occurs if the file does not exist.

 'rs+' - Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.

 This is primarily useful for opening files on NFS mounts as it allows you to skip the potentially stale local cache. It has a very real impact on I/O performance so don't use this flag unless you need it.

 Note that this doesn't turn fs.open() into a synchronous blocking call. If that's what you want then you should be using fs.openSync()

 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).

 'wx' - Like 'w' but fails if path exists.

 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).

 'wx+' - Like 'w+' but fails if path exists.

 'a' - Open file for appending. The file is created if it does not exist.

 'ax' - Like 'a' but fails if path exists.

 'a+' - Open file for reading and appending. The file is created if it does not exist.

 'ax+' - Like 'a+' but fails if path exists.

 */

//나눠서 파일쓰기

var fd = fs.openSync("test.txt","w");

for(let i=0;i<10;i++) {
    fs.writeSync(fd,"count = " + i + "\n");
}

fs.closeSync(fd);

console.log("save success test.txt");

