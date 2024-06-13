<script setup>
import { useLoginStore } from '../stores/login.js'
import CurrentLogin from '../components/CurrentLogin.vue'
const loginStore = useLoginStore()
</script>
<template>
  <div>
    <H1>LoginView</H1>
    <CurrentLogin></CurrentLogin>
    <form @submit.prevent="loginStore.handleSubmit" class="form" v-if="!loginStore.isLogin()">
      <div class="form-group">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="loginStore.form.login" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="loginStore.form.password" required />
      </div>
      <button class="btn btn-success" type="submit">Login</button>
      <button class="btn btn-secondary" @click="loginStore.cancel">Cancel</button>
      <div style="color: green" v-if="loginStore.message !== ''">{{ loginStore.message }}</div>
      <div style="color: red" v-if="loginStore.error !== ''">{{ loginStore.error }}</div>
    </form>
  </div>
</template>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.btn {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
}

.user-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

.user-item-actions {
  display: flex;
}

.user-item-actions button {
  margin-left: 10px;
}
</style>
