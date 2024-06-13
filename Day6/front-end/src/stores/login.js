import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import http from '../services/http'
export const useLoginStore = defineStore('login', () => {
  const form = ref({
    login: '',
    password: ''
  })

  const currentUser = ref(JSON.parse(localStorage.getItem('user')))
  const message = ref('')
  const error = ref('')
  async function handleSubmit() {
    try {
      const res = await http.post('/auth/login', form.value)
      console.log('Login Sucess')
      message.value = 'Login Sucess'
      error.value = ''
      currentUser.value = res.data.user
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.access_token)
    } catch (err) {
      console.log('Login Fail!!!')
      error.value = 'Login Fail!!!'
      message.value = ''
    }
  }
  function cancel() {
    form.value = {
      login: '',
      password: ''
    }
    message.value = ''
    error.value = ''
  }
  function logout() {
    currentUser.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }
  function isLogin() {
    return currentUser.value !== null
  }
  return { form, currentUser, message, error, handleSubmit, cancel, logout, isLogin }
})
