import { logout } from './cas.js'
export function handleResponseErrorStatus (error, vueMain) {
  if (error.response.status === 403 || error.response.status === 401) {
    logout()
  } else {
    vueMain.$notify.error({
      title: vueMain.$t('general.error_notification_title'),
      message: vueMain.$t('general.internal_error_message'),
      offset: 200,
      duration: 2000
    })
  }
}

export function convertErrorMessage (errors) {
  let errMsg = ''
  for (let i in errors) {
    if (errMsg !== '') {
      errMsg += ' \r\n '
    }
    errMsg += errors[i].code
    if (errors[i].message !== undefined) {
      errMsg += ': ' + errors[i].message
    } else if (errors[i].description !== undefined) {
      errMsg += ': ' + errors[i].description
    }
  }
  return errMsg
}
