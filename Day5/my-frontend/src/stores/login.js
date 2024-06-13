import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
export const useLoginStore = defineStore('login', () => {
  const userStore = useUserStore()
  const form = ref({
    login: '',
    password: ''
  })

  const currentUser = ref(null)
  const message = ref('')
  const error = ref('')
  function handleSubmit() {
    const loginUser = userStore.users.find((item) => item.login === form.value.login)
    if (!loginUser) {
      console.log('Not found!!!')
      error.value = 'Not found!!!'
      message.value = ''
      return
    }
    if (loginUser.password === form.value.password) {
      console.log('Login Sucess')
      message.value = 'Login Sucess'
      error.value = ''
      currentUser.value = loginUser
    } else {
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
  }
  function isLogin() {
    return currentUser.value !== null
  }
  return { form, currentUser, message, error, handleSubmit, cancel, logout, isLogin }
})
