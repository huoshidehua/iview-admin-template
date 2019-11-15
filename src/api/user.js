import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({userName, password}) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}



export const getUsers = (pageNum,
                         pageSize,
                         userName,
                         platform,
                         tags,
                         firstUseTimeBegin,
                         firstUseTimeEnd,
                         lastUseTimeBegin,
                         lastUseTimeEnd,
                         sortBy,
                         sortDesc) => {
  return axios.request({
    url: 'users',
    method: 'get',
    params: {
      "pageNum": pageNum,
      "pageSize": pageSize,
      "userName": userName,
      "platform": platform,
      "firstUseTimeBegin": firstUseTimeBegin,
      "firstUseTimeEnd": firstUseTimeEnd,
      "lastUseTimeBegin": lastUseTimeBegin,
      "lastUseTimeEnd": lastUseTimeEnd,
      "tags": tags,
      "sortBy":sortBy,
      "sortDesc":sortDesc
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}


