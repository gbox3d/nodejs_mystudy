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