const state = {
  systemTitle: 'vue3-admin',
  token: null,
  renderRoutes: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROUTES: (state, routes) => {
    state.renderRoutes = routes
  }
}
const actions = {
  setRoutes(context, value) {
    context.commit('SET_ROUTES', value)
  },
  setToken(context, value) {
    context.commit('SET_TOKEN', value)
  }
}
export default {
  state,
  mutations,
  actions
}
