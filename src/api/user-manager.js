import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/api/user/detail',
    method: 'get',
    params: { id }
  })
}

// export function fetchPv(pv) {
//   return request({
//     url: '/api/user/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

export function createUser(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data
  })
}
