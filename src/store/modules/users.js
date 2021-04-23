//import axios from 'axios';

const state = {
    users: []
}

const getters = {
    stateUsers: (state) => state.users
}

const actions = {

    async addUser({ commit }, user) {
        await commit('addUsers', user)
    }
};
const mutations = {
    setUsers(state, users) {
        state.users = users
    },
    addUsers(state, user) {
        state.users.push(user)
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};