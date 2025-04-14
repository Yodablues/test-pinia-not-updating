<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount, onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const route = useRoute()
onBeforeMount(() => {
  //fetch tokens from local storage
  const accessToken = localStorage.getItem('app_accessToken')
  const refreshToken = localStorage.getItem('app_refreshToken')
  //check if tokens are present
  if (accessToken && refreshToken) {
    //set tokens in store
    userStore.setTokens(accessToken, refreshToken)
  }
})

onMounted(async () => {
  //check if user is authenticated
  if (userStore.isAuthenticated) {
    //fetch user data
    console.log('User data fetched')
    console.log(userStore.setTokens)
    const { slug } = route.params
    if (slug) {
      console.log('Branding fetched for slug:', slug)
    }
  }
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
