import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    tokens: {},
  }),
  getters: {
    isAuthenticated: (state) => Object.keys(state.tokens).length > 0,
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    setTokens(accessToken: string, refreshToken: string) {
      this.tokens = {
        accessToken,
        refreshToken,
      }

      // Update the old tokens locations in localStorage for legacy supports
      window.localStorage.setItem('app_accessToken', accessToken)
      window.localStorage.setItem('app_refreshToken', refreshToken)
    },
    logout() {
      this.user = {}
      this.tokens = {}
      window.localStorage.removeItem('app_accessToken')
      window.localStorage.removeItem('app_refreshToken')
    },
  },
})
