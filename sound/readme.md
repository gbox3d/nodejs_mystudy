## 라즈베리 사운드 셋업 (raspberry pi sound setup)

### 1. CLI 싸운드 유틸리티

커멘트 상에서 사용하기 위한 유틸리티 이므로 프로그램환경과는 무관하다.

알사유틸설치
````bash
sudo apt-get install alsa-utils
````
mp3 플레이어 설치
````bash
sudo apt-get install mpg321
````
wav -> mp3 변환툴설치
````bash
sudo apt-get install lame

````

### 싸운드드라이버 설치및 확인

```bash
sudo modprobe snd-bcm2835
sudo lsmod | grep 2835
```


### sound 디바이스 셋업

출력모듈 지정 0번 자동,1번 아날로그 ,2 번 hdmi  
n 에 원하는 번호를 써넣으면 됩니다.
```bash
sudo amixer cset numid=3 n
```

예를들어 아날로그 스피커를 사용하고 싶다면 n을 1이라고 해줍니다.
```bash
sudo amixer cset numid=3 1
```


볼륨조정
```bash
sudo amixer cset numid=1 n
```
n은 0~400 또는 0%~100% 입력가능


아래와 같은 식으로 소리잘나는지 확인 합니다.

```bash
aplay fx/welcome.wav 

mpg321 bgm/lv1.mp3 

speaker-test -t sine -f 440 -c 2 -s 1

```

mpg321 실행해서 다음과 같은 에러메씨지가 안나오게 하려면

```text
ALSA lib pcm.c:2217:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.front
```

"/usr/share/alsa/alsa.conf" 파일열어서 pcm.front cards.pcm.front -> pcm.front cards.pcm.default 으로 수정한다  
```bash
sudo nano /usr/share/alsa/alsa.conf

```

###  node.js 프로그래밍을 위한 npm 설치하기

speaker 라는 플러그인을 설치해준다. 제목 그대로 스피커를 제어 해주는 모듈입니다.
그러나 그냥설치하면 에러가 납니다. 필수 라이브러리 들을 설치해야합니다.

```bash
sudo apt-get install libasound2-dev
```

spaker npm 설치하고  mp3 리더기인 lame 과 wav 리더기인 wav 를 설치합니다. 
```bash
sudo npm install speaker
sudo npm install wav
sudo npm install lame

```

## 참고 

기본적인 방법  
http://www.raspberrypi-spy.co.uk/2013/06/raspberry-pi-command-line-audio/
http://lky1001.tistory.com/65
http://cagewebdev.com/index.php/raspberry-pi-getting-audio-working/

노드로 다루기  
http://nmecdesign.com/blog/audio-on-the-raspberry-pi-with-node-js/

http://cagewebdev.com/index.php/raspberry-pi-getting-audio-working/

npm spearker 에러날때  
http://askubuntu.com/questions/93118/error-while-installling-qt-mobility-tool-kit

aplay 랩퍼 맥도 지원됨   
https://www.npmjs.com/package/aplay

좀거 로우레벨..  
https://www.npmjs.org/package/audiolib
