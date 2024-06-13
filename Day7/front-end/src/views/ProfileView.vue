<script setup>
    import { useLoginStore } from '../stores/login.js'

    const loginStore = useLoginStore()
</script>

<template>
    <div>
        <img
      :src="'http://localhost:3000/uploads/' + loginStore.currentUser.image"
      alt="Profile image"
      class="user_img"
    />
    </div>
    <div>{{ loginStore.currentUser }}</div>
</template>

<style scoped>
  .user_img{
    width: 50px;
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  }
</style>