import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const form = ref({
    id: -1,
    login: '',
    name: '',
    password: '',
    gender: '',
    age: null
  })
  const users = ref([
    {
      id: 1,
      login: 'user01',
      name: 'User 1',
      password: 'password',
      gender: 'male',
      age: 18
    },
    {
      id: 2,
      login: 'user02',
      name: 'User 2',
      password: 'password',
      gender: 'female',
      age: 40
    }
  ])
  // let lastId = 3
  const showForm = ref(false)

  async function handleSubmit() {
    if (form.value.id === -1) {
      try{
        const res = await axios.post('http://localhost:3000/users', form.value)
        console.log(res)
        getUsers()
      } catch (error) {
        console.log(error)
      }
      
      // form.value.id = lastId
      // users.value.push({ ...form.value })
      // lastId++
    } else {
      try{
        const res = await axios.patch('http://localhost:3000/users/' + form.value.id, form.value)
        console.log(res)
        getUsers()
      } catch (error) {
        console.log(error)
      }
      }
      // const index = users.value.findIndex((item) => item.id === form.value.id)
      // users.value[index] = { ...form.value }
    clearForm()
  }

  function clearForm() {
    form.value = {
      id: -1,
      login: '',
      name: '',
      password: '',
      gender: '',
      age: null
    }
  }

  function cancel() {
    clearForm()
    showForm.value = false
  }

  async function deleteUser(id) {
    try{
      const res = await axios.delete('http://localhost:3000/users/' + id)
      console.log(res)
      getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  function editUser(item) {
    form.value = { ...item }
    showForm.value = true
  }

  function addNew() {
    showForm.value = true
  }

  async function getUsers(){
    try{
      const res = await axios.get('http://localhost:3000/users')
      console.log(res)
      users.value = res.data
    } catch(error){
      console.log(error)
    }
    
  }

  return { 
    form, 
    users, 
    showForm, 
    handleSubmit, 
    clearForm, 
    cancel, 
    deleteUser, 
    editUser, 
    addNew, 
    getUsers }
})
