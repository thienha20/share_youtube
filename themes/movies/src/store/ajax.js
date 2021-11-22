import axios from "axios"
import {API_URL, API_SECRET_KEY, GOOGLE_API_KEY} from "./constant"

export const ajaxGet = (url, data = null, cb = null) => {
    url = API_URL + url
    let params = ""
    if (data) {
        for (const i in data) {
            if (typeof data[i] === "object") {
                for (const j in data[i]) {
                    params += `${i}[${j}]=${data[i][j]}&`
                }
            } else {
                params += `${i}=${data[i]}&`
            }

        }
    }
    if (params !== "") {
        params = params.substr(0, params.length - 1)
    }
    if (url.indexOf("?") > -1) {
        url += "&" + params
    } else {
        url += "?" + params
    }

    return axios.get(url)
        .then(function (response) {
            // handle success
            if (cb && typeof cb === "function") {
                cb(response)
            }
            return response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            return false
        })
}

export const ajaxPost = (url, data = {}, cb = null) => {
    url = API_URL + url
    let headers = {}
    if (API_SECRET_KEY !== "") {
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Brear " + API_SECRET_KEY
        }
    }
    return axios.post(url, data, headers)
        .then(function (response) {
            // handle success
            if (cb && typeof cb === "function") {
                cb(response)
            }
            return response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            return false
        })
}

export const getYoutubeInfo = async (code) => {
    let statistics = `https://www.googleapis.com/youtube/v3/videos?part=statistics&key=${GOOGLE_API_KEY}`
    let snippet = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${GOOGLE_API_KEY}`
    let obj = {
        statistics: {},
        snippet: {}
    }
    for (let c of code){
        statistics += `&id=${c}`
        snippet += `&id=${c}`
    }
    let st = await axios.get(statistics).then(res => res.data.items)
    let sn = await axios.get(snippet).then(res => res.data.items)
    for(let i in st){
        obj.statistics[st[i].id] = st[i].statistics
    }
    for(let x in sn){
        obj.snippet[sn[x].id] = sn[x].snippet?.localized
    }
    return obj
}