import request from '@/util/request'

// 查询充电订单列表
export function chargingOrdersList(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/charging-orders/list',
      method: 'post',
      data: data
    })
}

// 查询行驶里程列表
export function mileageList(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/vehicle-mileage/list',
      method: 'post',
      data: data
    })
}