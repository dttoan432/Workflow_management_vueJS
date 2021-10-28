import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import workflow from './modules/workflow'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        workflow,
        auth
    }
})

export default store