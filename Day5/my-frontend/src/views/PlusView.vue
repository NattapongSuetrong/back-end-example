<script setup>
import { ref } from 'vue'
import axios from 'axios'
const num1 = ref(0)
const num2 = ref(0)
const result = ref(0)
async function plus() {
  // result.value = num1.value + num2.value
  // axios
  //   .get('http://localhost:3000', {
  //     // ?num1=10&num2=1
  //     params: {
  //       num1: num1.value,
  //       num2: num2.value
  //     }
  //   })
  //   .then(function (response) {
  //     console.log(response.data)
  //     result.value = response.data
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  try {
    const response = await axios.get('http://localhost:3000', {
      // ?num1=10&num2=1
      params: {
        num1: num1.value,
        num2: num2.value
      }
    })
    console.log(response.data)
    result.value = response.data
  } catch (error) {
    console.log(error)
  }

  console.log('Finish plus')
}
</script>
<template>
  <div>
    <input type="number" v-model="num1" />
    + <input type="number" v-model="num2" /> <button @click="plus()">=</button> {{ result }}
  </div>
</template>
