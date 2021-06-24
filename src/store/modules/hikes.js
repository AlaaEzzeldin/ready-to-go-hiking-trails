import HikesAPI from '@/api/hikes.js';

const state = {
    hikes: []
}

const getters = {
    getHikes(state) {
        return state.hikes;
    }
}

const actions = {
    loadHike({ commit }, id) {
        HikesAPI.show(id)
            .then(function (response) {
                commit('setHikes', response.data);
            })
            .catch(function () {
                commit('setHikes', {});
            });
    },
    loadHikes({ commit }) {
        HikesAPI.index()
            .then(function (response) {
                commit('setHikes', response.data);
            })
            .catch(function () {
                commit('setHikes', {});
            });
    }
}

const mutations = {
    setHikes(state, hikes) {
        state.hikes = hikes;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}