# nodejs_mystudy

# 디버깅 하기
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
