<script setup>
import { ref } from 'vue'
import http from '../services/http'
import { useLoginStore } from '../stores/login.js'

const fileInput = ref(null)
const uploadStatus = ref('')
const loginStore = useLoginStore()

async function uploadFile() {
  console.log(fileInput.value.files[0])
  const file = fileInput.value.files[0]
  if (!file) {
    uploadStatus.value = 'No file selected.'
    return
  }
  uploadStatus.value = ''
  const formData = new FormData()
  formData.append('file', file)
  try {
    const res = await http.post('/auth/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(res.data)
    uploadStatus.value = `File uploaded successfully: ${res.data.filename}`
    loginStore.updateLogin()
  } catch (err) {
    console.log(err)
    uploadStatus.value = 'File upload failed.'
  }
}
</script>

<template>
    <div class="container">
      <h1>User Profile</h1>
      <div class="profile-details">
        <img
          :src="'http://localhost:3000/uploads/' + loginStore.currentUser.image"
          alt="Profile image"
          class="profile-img"
        />
        <div class="profile-info">
          <p><strong>ID:</strong> {{ loginStore.currentUser.id }}</p>
          <p><strong>Login:</strong> {{ loginStore.currentUser.login }}</p>
          <p><strong>Name:</strong> {{ loginStore.currentUser.name }}</p>
          <p><strong>Gender:</strong> {{ loginStore.currentUser.gender }}</p>
          <p><strong>Age:</strong> {{ loginStore.currentUser.age }}</p>
        </div>
      </div>
      <form @submit.prevent="uploadFile" class="upload-form">
        <input type="file" ref="fileInput" />
        <button type="submit">Upload</button>
        <span>{{ uploadStatus }}</span>
      </form>
    </div>
</template>

<style scoped>
  .container {
  max-width: 500px;
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
  
  .profile-details {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
  }
  
  .profile-info p {
    margin: 5px 0;
    color: #333;
  }
  
  .upload-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="file"] {
    margin: 10px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  span {
    margin-top: 10px;
    color: #333;
  }
</style>
  