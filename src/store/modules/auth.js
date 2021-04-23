import axios from 'axios';
const state = {
    user: null

};
const getters = {
    isAuthenticated: state => !!state.user,    
    StateUser: state => state.user,
};
const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
      },

      async LogIn({commit}, User) {
        await axios.post('login', User)
        await commit('setUser', User.get('email'))
      },

      async LogOut({commit}){
        let user = null
        commit('logout', user)
      }
};
const mutations = {
    setUser(state, email){
        state.user = email
    },
    LogOut(state){
        state.user = null
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};