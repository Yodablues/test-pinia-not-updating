import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach } from 'vitest'
import App from '../App.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/userStore'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.setItem('app_accessToken', 'asd')
    window.localStorage.setItem('app_refreshToken', 'asd')
  })

  it('renders', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub,
          RouterView: true,
        },
      },
    })
    const userStore = useUserStore()

    expect(userStore.setTokens).toHaveBeenCalled()
    expect(wrapper.exists()).toBe(true)
    expect(userStore.isAuthenticated).toBe(true)
  })
})
