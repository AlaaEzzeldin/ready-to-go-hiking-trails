//import axios from 'axios';
import { mapActions } from "vuex";
//import USER from "@/store/User"
const state = {
  user: null

};
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};
const actions = {

  ...mapActions({ users: "stateUsers" }),
  // async Register({dispatch}, UserForm) {
  //     //await axios.post('register', form)
  //     await dispatch('LogIn', UserForm)
  //     await dispatch('adduser',UserForm)
  //     //await dispatch('addUser', UserForm)
  //   },

  async Register({ dispatch }, userObject) 
  {
    await dispatch('LogIn', userObject)
    await dispatch('adduser', userObject)
    //await dispatch('addUser', UserForm)

  },
  async LogIn({ commit }, User) {
    //await axios.post('login', User)
    await commit('setUser', User)
  },
  async adduser({ dispatch }, ObjectUser) {
    await dispatch('addUser', ObjectUser)
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