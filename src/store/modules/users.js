import axios from 'axios';

const state = {
    users: []
}

const getters = {
    allUsers: (state) => state.users
}

const actions = {
    async GetUsers({ commit }) {
        let response = await axios.get('users')
        commit('setUsers', response.data)
    },
};
const mutations = {

};
export default {
    state,
    getters,
    actions,
    mutations
};