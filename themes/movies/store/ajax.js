import axios from 'axios'
import {API_URL, API_SECRET_KEY} from './constant'

export const ajaxGet = (url, data = null, cb = null) => {
    url = API_URL+url;
    let params = ''
    if (data){
        for (const i in data) {
            if(typeof data[i] === "object"){
                for (const j in data[i]) {
                    params += `${i}[${j}]=${data[i][j]}&`
                }
            }else{
                params += `${i}=${data[i]}&`
            }

        }
    }
    if(params!==""){
        params = params.substr(0, params.length-1);
    }
    if(url.indexOf("?")>-1){
        url += '&' + params;
    }else{
        url += '?' + params;
    }

    return axios.get(url)
        .then(function (response) {
            // handle success
            if(cb && typeof cb === "function"){
                cb();
            }
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return false
        });
}

export const ajaxPost = (url, data = {}, cb = null) => {
    url = API_URL+url;
    let headers = {}
    if(API_SECRET_KEY !== ""){
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Brear '+ API_SECRET_KEY
        }
    }
    return axios.post(url, data, headers)
        .then(function (response) {
            // handle success
            if(cb && typeof cb === "function"){
                cb();
            }
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return false
        });
}