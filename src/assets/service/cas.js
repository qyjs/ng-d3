/*
 * @Author: dengyue.chen
 * @Date: 2017-05-03 15:43:35
 * @Last Modified by: dengyue.chen
 * @Last Modified time: 2017-09-05 18:55:05
 */
import { checkLogin, clearLoginInfo } from './sessionStorage.js'
import axios from 'axios'
const AUTH_LOGIN = '/cas/oauth2.0/authorize?client_id=key&response_type=code&redirect_uri='
const AUTH_LOGOUT = '/cas/oauth2.0/logout?service='
const AUTH_GET_TOKEN_REDIRECT_URI = '/cas/oauth2.0/accessToken?client_id=key&client_secret=secret&grant_type=authorization_code&redirect_uri='
const AUTH_GET_TOKEN_CODE = '&code='
const AUTH_GET_PFOFILE = '/cas/oauth2.0/profile?access_token='
const AUTH_PREFIX = 'Bearer '

const AUTH_API = 'static/config.json'
// dev

let authHost = ''

function doAuth () {
  let redirectURI = window.location.protocol + '//' + window.location.host + window.location.pathname
  // console.log('authHost', redirectURI, sessionStorage.getItem('Authorization'))
  if (!checkLogin()) {
    if (!authHost) {
      console.log('auth host is empty!')
      return false
    }
    let URL = require('url')
    // console.log('redirectURI:', redirectURI)
    if (URL.parse(window.location.href, true).query.code) {
      let getAccessTokenURI = authHost + AUTH_GET_TOKEN_REDIRECT_URI + redirectURI + AUTH_GET_TOKEN_CODE + URL.parse(window.location.href, true).query.code
      return getAccessToken(getAccessTokenURI, redirectURI)
    } else if (URL.parse(window.location.href, true).query.access_token) {
      console.log('access_token', redirectURI)
      sessionStorage.setItem('Authorization', URL.parse(window.location.href, true).query.access_token)
      window.location.href = redirectURI
      // console.log('sessionStorage Authorization', sessionStorage.getItem('Authorization'))
    } else {
      clearLoginInfo()
      let loginRedirectUri = authHost + AUTH_LOGIN + redirectURI
      console.log('loginRedirectUri', loginRedirectUri)
      window.location.href = loginRedirectUri
    }
    return
  }
  if (!sessionStorage.getItem('user_name') || sessionStorage.getItem('user_name') === 'undefined') {
    getProfile(authHost + AUTH_GET_PFOFILE + sessionStorage.getItem('Authorization'), redirectURI)
  }
  return true
}

function getAccessToken (url, redirectURI) {
  axios.get(url).then(response => {
    let accessToken = AUTH_PREFIX + response.data.slice(13)
    window.location.href = redirectURI + '?access_token=' + accessToken
  }).catch(error => {
    console.log('fail:', error)
  })
}

function getProfile (url, redirectURI) {
  url = url.replace(AUTH_PREFIX, '')
  // console.log('getProfile', url)
  axios.get(url).then(response => {
    if (response.data.id) {
      sessionStorage.setItem('user_name', response.data.id)
      window.location.href = redirectURI
    } else {
      logout()
    }
  }).catch(error => {
    console.log('getProfile fail:', error)
  })
}

export function logout () {
  clearLoginInfo()
  let redirectURI = window.location.protocol + '//' + window.location.host + window.location.pathname
  window.location.href = authHost + AUTH_LOGOUT + redirectURI
}

export function auth () {
  if (sessionStorage.getItem('cas_host') && sessionStorage.getItem('cas_host') !== 'undefined') {
    // console.log('cas_host', sessionStorage.getItem('cas_host'))
    authHost = sessionStorage.getItem('cas_host')
    return doAuth()
  } else {
    let getAuthAPI = window.location.protocol + '//' + window.location.host + window.location.pathname + AUTH_API
    let redirectURI = window.location.protocol + '//' + window.location.host + window.location.pathname
    console.log('getAuthAPI:', getAuthAPI)
    axios.get(getAuthAPI).then(response => {
      console.log('getAuthAPI success:', response.data)
      if (!response.data.casAuthHost) {
        console.log('cannot get cas url', response.data.casAuthHost)
      } else {
        authHost = response.data.casAuthHost
        sessionStorage.setItem('cas_host', authHost)
        window.location.href = redirectURI
      }
    }).catch(error => {
      console.log('getAuthAPI fail:', error)
    })
  }
}

export function redirectLogin () {
  // clearLoginInfo()
  let redirectURI = window.location.protocol + '//' + window.location.host + window.location.pathname
  let loginRedirectUri = authHost + AUTH_LOGIN + redirectURI
  console.log('redirectLogin:', loginRedirectUri)
  window.location.href = loginRedirectUri
}
