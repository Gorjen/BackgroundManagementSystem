import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUser = (param) => {
    return axios.request({
        url: '/user/getUser',
        params: param
    })
}

export const addUser = (param) => {
    return axios.request({
        url: '/user/add',
        method: 'post',
        data: param
    })
}

export const editUser = (param) => {
    return axios.request({
        url: '/user/edit',
        method: 'post',
        data: param
    })
}

export const deleteUser = (param) => {
    return axios.request({
        url: '/user/del',
        method: 'post',
        data: param
    })
}