<script setup>
import { useLoginStore } from '../stores/login.js'

const loginStore = useLoginStore()
</script>

<template>
  <div v-if="loginStore.isLogin()">
    {{ loginStore.currentUser.login }} is login.
    <button @click="loginStore.logout">Logout</button>
  </div>
</template>
