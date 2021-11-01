export default {
    namespaced: true,
    state: {
        isShow: false,
        isDsNone: false,
        card: []
    },
    getters: {},
    mutations: {
        updateIsShow: (state, value) => {
            state.isShow = value
        },
        updateIsDsNone: (state, value) => {
            state.isDsNone = value
        },
        updateCard: (state, value) => {
            state.card = value
        },
    }
}