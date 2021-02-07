import axios from 'axios'
import getMixins from '../../helpers/mixin'
const modulRegister = {
  namespaced: true,
  state: () => {
    return {
    }
  },
  mutations: {
  },
  actions: {
    actionLogin (context, data) {
      // console.log(data)
      return new Promise((resolve, reject) => {
        axios.post(`${getMixins.data().serverUrl}/register`, data).then((response) => {
          // console.log(response.data.message)
          resolve(response.data.message)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
  getters: {
  }
}
export default modulRegister
