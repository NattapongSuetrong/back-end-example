import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http'
export const useTodoStore = defineStore('todo', () => {
  const form = ref({
    id: -1,
    text: ''
  })
  const todos = ref([])
  const showForm = ref(false)

  async function getTodos() {
    try {
      const res = await http.get('/todos')
      console.log(res)
      todos.value = res.data
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSubmit() {
    if (form.value.id === -1) {
      try {
        const res = await http.post('/todos', form.value)
        console.log(res)
        await getTodos()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await http.patch('/todos/' + form.value.id, form.value)
        console.log(res)
        await getTodos()
      } catch (error) {
        console.log(error)
      }
    }
    clearForm()
  }

  function clearForm() {
    form.value = {
      id: -1,
      text: ''
    }
  }

  function cancel() {
    clearForm()
    showForm.value = false
  }

  async function deleteTodo(id) {
    try {
      const res = await http.delete('/todos/' + id)
      console.log(res)
      await getTodos()
    } catch (error) {
      console.log(error)
    }
  }

  function editTodo(item) {
    form.value = { ...item }
    showForm.value = true
  }

  function addNew() {
    showForm.value = true
  }

  return {
    form,
    todos,
    showForm,
    handleSubmit,
    clearForm,
    cancel,
    deleteTodo,
    editTodo,
    addNew,
    getTodos
  }
})
