<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{ user.name }}</p>
    <button class="button" v-on:click="change_name()">Add to Cart</button>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  name: 'HomeView',
  setup(){
    const user = useUserStore()
    const change_name = () => {
      user.change_name("yuyuyuyuy")
    }
    return{
      user,
      change_name,
    }
  },
}
</script>
