import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import retroBoard from './modules/retroBoard'
import getters from './getters'
import firebasePersist from './plugins/firebase-persist'
import { database } from 'firebase'

Vue.use(Vuex)

const firebasePersistPlugin = firebasePersist(database)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    user,
    retroBoard
  },
  getters,
  plugins: [firebasePersistPlugin]
})

export default store
