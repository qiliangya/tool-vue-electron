const axios = require('axios')

class RequestHttp {
  constructor () {
    this.default = {
      baseURL: '',
      timeout: 10 * 1000,
      headers: {}
    }
  }
}

class RequestInstance extends RequestHttp {
  constructor () {
    super()
    this.instance = this.init()
  }

  init () {
    return axios.create(this.default)
  }
}

export const instance = new RequestInstance().instance
export default instance
