import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getIndexConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {

            }
        }
        return config
    }

    interceptors(instance) {
        instance.interceptors.request.use(function(config) {
            return config;
        }, function(error) {
            return Promise.reject(error);
        });

        instance.interceptors.response.use(function(response) {
            // console.log(response, 'response')
            return response;
        }, function(error) {
            // console.log(error, 'error')
            return Promise.reject(error);
        });
    }

    request(options) {
        const instance = axios.create()
        options = {
            ...this.getIndexConfig(), ...options
        }
        this.interceptors(instance)
        console.log("axios: ", "options", options)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)