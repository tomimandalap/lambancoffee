import axios from 'axios'
import getMixins from '../../helpers/mixin'
const modulProduct = {
  namespaced: true,
  state: () => {
    return {
      listProduct: [],
      detailProduct: [],
      isLoading: false,
      isError: false,
      errMessage: '',
      pagination: {},
      stsBtn: ''
    }
  },
  mutations: {
    setListProduct (state, payload) {
      state.listProduct = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    },
    setIsError (state, payload) {
      state.isError = payload
    },
    setErrMessage (state, payload) {
      state.errMessage = payload
    },
    setPagination (state, paylod) {
      state.pagination = paylod
    },
    setDetailProduct (state, payload) {
      state.detailProduct = payload
    },
    setGetStsBtn (state, payload) {
      state.stsBtn = payload
    }
  },
  actions: {
    actionsListProduct (contex, data) {
      // console.log(contex.rootState.auth.token)
      // console.log(getMixins.data().serverUrl)
      axios.get(`${getMixins.data().serverUrl}/product?search=name&keyword=${data.keyword}&sort=${data.sort}&metode=${data.metode}&page=${data.page}&limit=${data.limit}`, {
        headers: {
          token: contex.rootState.auth.token
        }
      }).then((response) => {
        // console.log(response.data.data)
        contex.commit('setListProduct', response.data.data)
        contex.commit('setIsError', false)
        contex.commit('setPagination', response.data.pagination)
      }).catch((error) => {
        // console.log(error.response.data)
        contex.commit('setIsError', true)
        contex.commit('setErrMessage', error.response.data.message)
      })
    },
    insertProduct (contex, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${getMixins.data().serverUrl}/product`, data, {
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
    updateProduct (contex, data) {
      return new Promise((resolve, reject) => {
        axios.put(`${getMixins.data().serverUrl}/product/${data.id}`, data.data, {
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
    detailProduct (contex, id) {
      axios.get(`${getMixins.data().serverUrl}/product/${id}`, {
        headers: {
          token: contex.rootState.auth.token
        }
      }).then((response) => {
        contex.commit('setDetailProduct', response.data.data[0])
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteDetailProduct (contex, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${getMixins.data().serverUrl}/product/${id}`, {
          headers: {
            token: contex.rootState.auth.token
          }
        }).then((response) => {
          resolve(response.data.message)
        }).catch((error) => {
          reject(error.response.data.message)
        })
      })
    },
    getStsBtn (contex, data) {
      contex.commit('setGetStsBtn', data)
    }
  },
  getters: {
    getListProduct (state) {
      return state.listProduct
    },
    getListError (state) {
      return state.isError
    },
    getListErrMessage (state) {
      return state.errMessage
    },
    getPagination (state) {
      return state.pagination
    },
    getDetailProduct (state) {
      return state.detailProduct
    },
    getStsButton (state) {
      return state.stsBtn
    }
  }
}

export default modulProduct
