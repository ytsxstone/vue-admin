import Vue from 'vue';
import axios from 'axios';
import Util from './util';
import appConfig from './appConfig';

// 创建axios实例
const ajax = axios.create({
    baseURL: appConfig.remoteServiceBaseUrl,
    timeout: 9000
});

// 请求拦截器
ajax.interceptors.request.use(function (config) {
    if(!!window.abp.auth.getToken()) {
        config.headers.common["Authorization"] = "Bearer " + window.abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"] = window.abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"] = window.abp.multiTenancy.getTenantIdCookie();
    return config;
},function (error) {
    return Promise.reject(error);
});

let vm = new Vue({});
// 添加一个响应拦截器
ajax.interceptors.response.use((response)=>{    
    return response;
},(error)=>{
    if(!!error.response&&!!error.response.data.error&&!!error.response.data.error.message&&error.response.data.error.details) {
        vm.$Modal.error({title:error.response.data.error.message,content:error.response.data.error.details});
    }
    else if(!!error.response&&!!error.response.data.error&&!!error.response.data.error.message) {
        vm.$Modal.error({title:window.abp.localization.localize("LoginFailed"), content:error.response.data.error.message});
    }
    else if(!error.response) {
        vm.$Modal.error({title: 'Error', content: window.abp.localization.localize('UnknownError')});
    }

    // 关闭消息框
    setTimeout(()=>{vm.$Message.destroy();}, 1000);

    return Promise.reject(error);
});

export default ajax;