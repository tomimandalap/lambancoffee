import axios from 'axios'
import getMixins from '../../helpers/mixin'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      name: localStorage.getItem('name') || '',
      token: localStorage.getItem('token') || null,
      access: localStorage.getItem('access') || ''
    }
  },
  mutations: {
    setName (state, payload) {
      state.name = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setAccess (state, payload) {
      state.access = payload
    }
  },
  actions: {
    actionLogin (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${getMixins.data().serverUrl}/login`, data).then((response) => {
          // console.log(response.data.data.token)
          localStorage.setItem('name', response.data.data.name)
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('access', response.data.data.access)
          context.commit('setName', response.data.data.name)
          context.commit('setToken', response.data.data.token)
          context.commit('setAccess', response.data.data.access)
          resolve(response.data.message)
        }).catch((error) => {
          // console.log(error.message)
          reject(error)
        })
      })
    },
    actionLogout (contex) {
      return new Promise((resolve) => {
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('access')
        contex.commit('setName', '')
        contex.commit('setToken', null)
        contex.commit('setAccess', '')
        resolve(true)
      })
    }
  },
  getters: {
    getKodeToken (state) {
      return state.token
    },
    getNameAccess (state) {
      return state.name
    },
    getCodeAccess (state) {
      return state.access
    }
  }
}
export default moduleAuth
