import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from'./mockServeData/user'
import permission from './mockServeData/permission'

Mock.mock('/home/getData', homeApi.getStatisticalData)

Mock.mock('/user/add', 'post', user.createUser)
Mock.mock('/user/edit', 'post', user.updateUser)
Mock.mock('/user/del', 'post', user.deleteUser)
Mock.mock(/user\/getUser/, user.getUserList)

Mock.mock(/permission\/getMenu/, permission.getMenu)