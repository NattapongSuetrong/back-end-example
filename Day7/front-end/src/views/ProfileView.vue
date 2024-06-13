<script setup>
    import { useLoginStore } from '../stores/login.js'
    import { ref } from 'vue'
    import http from '../services/http.js'

    const loginStore = useLoginStore()
    const fileInput = ref(null)
    const uploadStatus = ref('')

    async function uploadFile () {
        console.log(fileInput.value.files[0])
        const file = fileInput.value.files[0]
        if(!file) {
            uploadStatus.value = 'No file selected.'
            return
        }
        uploadStatus.value = ''
        const formData = new FormData()
        formData.append('file', file)
        
        try{
            const res = await http.post('users/upload', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
            console.log(res.data)
        } catch (err){
            console.log(err)
        }
    }
</script>

<template>
    <div class="container">
        <h1>Profile</h1>
        <div>
            <img
                :src="'http://localhost:3000/uploads/' + loginStore.currentUser.image"
                alt="Profile image"
                class="user_img"
            />
            <form @submit.prevent="uploadFile()">
                <input type="file" ref="fileInput"> 
                <button type="submit">upload</button>
                <span>{{ uploadStatus }}</span>
            </form>
        </div>
        <div>{{ loginStore.currentUser }}</div>
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

  .user_img{
    width: 50px;
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  }
</style>