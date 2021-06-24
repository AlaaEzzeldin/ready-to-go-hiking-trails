import UsersAPI from '@/api/users.js';

const state = {
    users: []
}

const getters = {
    getUsers: (state) => state.users
}

const actions = {
    async AddUser({ commit }, user) {
        await commit('addUsers', user)
    },
    async DeleteUsers({ commit }, selectedUusers) {
        await commit('deleteUsers', selectedUusers)
    },
     loadUsers({ commit }) {
        UsersAPI.index()
            .then(function (response) {
                commit('setUsers', response.data);
            })
            .catch(function () {
                commit('setUsers', {});
            });
    }
}
const mutations = {
    setUsers(state, users) {
        state.users = users
    },
    addUsers(state, user) {
        state.users.push(user)
    },
    deleteUsers(state, selected) {
        state.users = state.users.filter(el => !selected.includes(el));
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};