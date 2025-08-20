import request from '@/util/request'

// 用户登录
export function userLogin(data) {
    return request({
      url: '/dev-api/login',
      method: 'post',
      data: data
    })
}

// 查询用户信息
export function userInfo() {
    return request({
      url: '/dev-api/getInfo',
      method: 'get'
    })
}