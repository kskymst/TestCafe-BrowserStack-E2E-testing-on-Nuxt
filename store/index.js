export const state = () => ({
  userName: ''
})

export const mutations = {
  SET_USER(state, name) {
    state.userName = name
  }
}
