import Mock from 'mockjs'
import {login, logout, getUserInfo} from './login'
import {getUserlist} from './user'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)


//用户模块
Mock.mock(/\/users/, getUserlist)

export default Mock
