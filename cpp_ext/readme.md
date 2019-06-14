## 노드 확장 모듈 만들기

binding.gyp 로 확장모듈의 빌드 환경을 정의한다.  

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "mo1.cc" ,
        "mo2.cc"
      ]
    }
  ]
}

```

위와 같이하면 mo1.cc mo2.cc 파일두개를 컴파일하여 addon.node 파일을 만들기위한 make 파일이 생성된다.
그런 다음 확장 모듈을 빌드 하기위해서 node-gyp 를 이용해서 자동으로 make 파일을 생성한다.    
```bash
node-gyp configure
```
  
build 디랙토리가 생성되고 그안에 make 파일이 만들어 진다. 그런다음 build 옵션을 주어서 컴파일 한다.  

```bash
node-gyp build
```

node-gyp의 옵션은 다음과 같다.
```bash
Usage: node-gyp <command> [options]

  where <command> is one of:
    - build - Invokes `make` and builds the module
    - clean - Removes any generated build files and the "out" dir
    - configure - Generates a Makefile for the current module
    - rebuild - Runs "clean", "configure" and "build" all at once
    - install - Install node development files for the specified node version.
    - list - Prints a listing of the currently installed node development files
    - remove - Removes the node development files for the specified version

```



##참고

https://nodejs.org/docs/latest/api/addons.html#addons_hello_world

깃헙 예제  
https://github.com/nodejs/node-addon-examples

gyp 문서
https://gyp.gsrc.io/docs/UserDocumentation.md
