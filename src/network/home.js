import { request, requestOuer } from './request'

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

export function getCatGoods (category, page) {
  return requestOuer({
    url: '/product/cms/list/search',
    method: 'post',
    data: {
      page,
      category,
      size: 10,
      "sources":[0,1001,1002,1003,1004,1005,1006,1007,2000,2001,2002,2003]
    }
  })
}
