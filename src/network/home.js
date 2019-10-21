//封装所有对首页的网络请求
import {request} from "./request";

export  function getHomeMulitdata() {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/home/multidata'
  })
}

export  function getHomeGoods(type, page) {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/home/data',
    params:{
      type,
      page
    }
  })
}
