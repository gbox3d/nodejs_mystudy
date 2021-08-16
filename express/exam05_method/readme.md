### method 

* POST  
post 같은 경우에는 데이터가 나눠져 들어오는데 그모든 처리가 이미 끝났다는 가정하애 콜백이 이루어진다.  
그러므로 미들웨어를 따로 만들어 이전에 처리해주어야한다.  
바디데이터를 직접 다루는것은 use 함수의 res에서 가능하다.  

* 전통적인 form  
Content-Type : application/x-www-form-urlencoded  
전통적인 바디데이터의 형식은 키와밸류의 쌍으로 개행으로 구분된 텍스트이다.  
예를 들자면 아래와 같다.  
name=tommy  
age=20  
