#include <node_api.h>
#include <assert.h>

extern void helloword();

napi_value Method(napi_env env, napi_callback_info info) {

  //오류체크용 변수
  napi_status status;

  napi_value world;

  status = napi_create_string_utf8(env, "world", 5, &world);

  //오류체크
  assert(status == napi_ok);

  helloword();

  return world;
}

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Init(napi_env env, napi_value exports) {

  napi_status status;

//디스크립터 만들기
  napi_property_descriptor desc = DECLARE_NAPI_METHOD("hello", Method);

//https://nodejs.org/docs/latest/api/n-api.html#n_api_napi_define_properties
  status = napi_define_properties(env, exports,
    1,//프로퍼티 디스크립터 배열 갯수
    &desc //프로퍼티 디스크립터 배열포인터
  );

//오류 체크
  assert(status == napi_ok);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)