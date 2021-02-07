import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
import modulRegister from './modules/register'
import modulProduct from './modules/product'
import modulCategory from './modules/category'
import modulHistory from './modules/Datahistory'
Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
      title: 'Menu Items'
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth: moduleAuth,
    registration: modulRegister,
    products: modulProduct,
    category: modulCategory,
    mHistory: modulHistory
  }
})
export default store
