<script setup>
import axios from 'axios'
import {onMounted} from 'vue'
const baseUrl = import.meta.env.VITE_BASE_URL
const path = import.meta.env.VITE_VITE_PATH

onMounted( ()=> {
  console.log(baseUrl)
  axios.get(`${baseUrl}/api/${path}/products/all`)
    .then(res=>{
      console.log(res)
    })
  // const config = {
  //   headers: { Authorization: token },
  // };
  // axios
  //   .post('/V2/api/user/check', {}, config)
  //     .then((res) => {
  //       console.log(res.data);
  //     }).catch((error) => {
  //       console.log(error.response.data);
  //     })
          
})
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>
