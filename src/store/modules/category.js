import axios from 'axios'
import getMixins from '../../helpers/mixin'
const modulCategory = {
  namespaced: true,
  state: () => {
    return {
      dataCategory: []
    }
  },
  mutations: {
    setDataCategory (state, payload) {
      state.dataCategory = payload
    }
  },
  actions: {
    actionGetDataCategory (contex) {
      axios.get(`${getMixins.data().serverUrl}/category?page=1&limit=10`, {
        headers: {
          token: contex.rootState.auth.token
        }
      }).then((response) => {
        contex.commit('setDataCategory', response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    getDataCategory (state) {
      return state.dataCategory
    }
  }
}

export default modulCategory
