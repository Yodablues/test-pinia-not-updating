import { describe, it, expect, beforeEach, beforeAll, afterAll, afterEach } from 'vitest'
import App from '../App.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useUserStore } from '@/stores/userStore'

describe('App', () => {
  const restHandlers = [
    http.get('https://localhost:5001/api/user/simple/', () => {
      return HttpResponse.json({ user: { id: 1, name: 'John Doe' } })
    }),
  ]

  const server = setupServer(...restHandlers)

  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  // Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test for test isolation
  afterEach(() => server.resetHandlers())

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
