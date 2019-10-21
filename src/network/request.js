import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const  instance = axios.create({
    baseUrl: 'http://123.207.32.32:8000/',
    timeout:5000
  })
  // 请求拦截
  instance.interceptors.request.use(config =>{
    return config
  },err =>{
  })
  // 请求相应
  instance.interceptors.response.use(config => {
    return config.data
  },err => {
    console.log(err);
  })

  //发送真正的网络请求
  return instance(config)
}


