import axios from 'axios'
import getMixins from '../../helpers/mixin'
const modulHistory = {
  namespaced: true,
  state: () => {
    return {
      listHistory: [],
      detailHistory: [],
      errStatus: false,
      errMsg: '',
      errCode: '',
      pagination: {}
    }
  },
  mutations: {
    setListHistory (state, paylod) {
      state.listHistory = paylod
    },
    setErrStatus (state, payload) {
      state.errStatus = payload
    },
    setErrMsg (state, payload) {
      state.errMsg = payload
    },
    setErrCode (state, payload) {
      state.errCode = payload
    },
    setPage (state, payload) {
      state.pagination = payload
    },
    setDetail (state, payload) {
      state.detailHistory = payload
    }
  },
  actions: {
    actionGetHistory (contex, data) {
      axios.get(`${getMixins.data().serverUrl}/history?page=${data.page}&limit=${data.limit}`, {
        headers: {
          token: contex.rootState.auth.token
        }
      }).then((response) => {
        // console.log(response.data)
        contex.commit('setListHistory', response.data.data)
        contex.commit('setErrStatus', false)
        contex.commit('setPage', response.data.pagination)
      }).catch((error) => {
        // console.log(error.response)
        contex.commit('setErrStatus', true)
        contex.commit('setErrCode', error.response.status)
        contex.commit('setErrMsg', error.response.statusText)
      })
    },
    actionDetailHistory (contex, id) {
      axios.get(`${getMixins.data().serverUrl}/history/${id}`, {
        headers: {
          token: contex.rootState.auth.token
        }
      }).then((response) => {
        // console.log(response.data.data)
        contex.commit('setDetail', response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteDetailHistory (contex, id) {
      // console.log(id)
      return new Promise((resolve, reject) => {
        axios.delete(`${getMixins.data().serverUrl}/history/${id}`, {
          headers: {
            token: contex.rootState.auth.token
          }
        }).then((response) => {
          // console.log(response.data)
          resolve(response.data.message)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    },
    createToCart (contex, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${getMixins.data().serverUrl}/cart`, data, {
          headers: {
            token: contex.rootState.auth.token
          }
        }).then((response) => {
          // console.log(response)
          resolve(response.data.message)
        }).catch((error) => {
          // console.log(error)
          reject(error.response.data.message)
        })
      })
    },
    deleteToCart (contex, id) {
      axios.delete(`${getMixins.data().serverUrl}/cart/${id}`).then((response) => {
        // console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    createToHistory (contex, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${getMixins.data().serverUrl}/history`, data, {
          headers: {
            token: contex.rootState.auth.token
          }
        }).then((response) => {
          // console.log(response)
          resolve(response.data.message)
        }).catch((error) => {
          reject(error.response.data.message)
        })
      })
    }
  },
  getters: {
    getListHistory (state) {
      return state.listHistory
    },
    getErrStatus (state) {
      return state.errStatus
    },
    getErrMsg (state) {
      return state.errMsg
    },
    getErrCode (state) {
      return state.errCode
    },
    getPages (state) {
      return state.pagination
    },
    getDetail (state) {
      return state.detailHistory
    }
  }
}

export default modulHistory
