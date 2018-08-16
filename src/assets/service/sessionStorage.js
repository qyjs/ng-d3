/*
 * @Author: dengyue.chen
 * @Date: 2017-05-03 15:08:12
 * @Last Modified by: dengyue.chen
 * @Last Modified time: 2017-05-18 20:01:17
 */

export function setLoginInfo (data) {
  // data.data.userName ? sessionStorage.setItem('user_name', data.data.userName) : sessionStorage.setItem('user_name', '')
  sessionStorage.setItem('tenantCode', data.body.tenantCode)
}

export function checkLogin () {
  let token = sessionStorage.getItem('Authorization')
  if (!token || token === 'undefined') {
    return false
  }
  return true
}

export function setLanage (data) {
  sessionStorage.setItem('Language', data)
}

export function renewToken (token) {
  if (token !== sessionStorage.getItem('Authorization')) {
    sessionStorage.setItem('Authorization', token)
  }
}

export function clearLoginInfo () {
  sessionStorage.removeItem('user_name')
  sessionStorage.removeItem('Authorization')
}
