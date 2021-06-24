//import axios from 'axios';
const state = {
  user: null

};
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};
const actions = {

  async Register({ dispatch }, userObject) {
    //await axios.post('register', userObject)
    await dispatch('LogIn', userObject)
  },
  async LogIn({ commit }, User) {
    //await axios.post('login', User)
    await commit('setUser', User)
  },
  async LogOut({ commit }) {
    let user = null
    commit('setUser', user)
  }
};
const mutations = {

  setUser(state, User) {
    state.user = User
  },
  LogOut(state) {
    state.user = null
  },
};
export default {
  state,
  getters,
  actions,
  mutations
};