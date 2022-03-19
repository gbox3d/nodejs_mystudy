# nodejs_mystudy


## 실해하는법
예제를 추가하고 package.json의 script 에 원하는 파일과 위치를 지정해서 실행하면 됩니다.  

./auth/bcrypt/index.js 파일을 실행시키싶으면 다음과 같이 추가해준 다음
```txt
"auth_bcrypt": "babel-node ./auth/bcrypt/index.js"
```
npm run auth_bcrypt 해주면된다.  


## 디버깅 하기
lainch.json 설정 예   
```json
{
    "name": "node-debug-test",
    "program": "${workspaceFolder}/nodejs_mystudy/ecma/1.let.js",
    "cwd": "${workspaceFolder}",
    "request": "launch",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "pwa-node"
},
```


## 바벨을 사용해서 node에서 es6 문법사용하기

16 버전에서도 아직은 es6문법을 정식으로 지원하지않는다 그래서 바벨이라는 번역기를 이용하여 es6문법을 사용할수있다.

```sh
npm i @babel/cli @babel/core @babel/node @babel/preset-env

```

babel.config.json파일을 다음과 같이 작성한다.
```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

package.json의 script 내용은 다음과 같이 변경한다.

```json
"scripts": {
    "start": "babel-node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

npm start 명령어로 index.js 스크립트를 실행가능하다.  
