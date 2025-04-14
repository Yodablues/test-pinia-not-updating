import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    tokens: {},
  }),
  getters: {
    isAuthenticated: (state) => Object.keys(state.tokens).length > 0,
  },
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.tokens = {
        accessToken,
        refreshToken,
      }
    },
  },
})
