export default {
    namespaced: true,
    state: {
        isShow: false,
        isDsNone: false,
        cardId: ''
    },
    getters: {},
    mutations: {
        updateIsShow: (state, value) => {
            state.isShow = value
        },
        updateIsDsNone: (state, value) => {
            state.isDsNone = value
        },
        updateCardId: (state, value) => {
            state.cardId = value
        },
    }
}