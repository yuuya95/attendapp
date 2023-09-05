<template>
  <div class="about">
    <p>{{ user.name }}</p>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'
export default {
  name: 'HomeView',
  setup(){
    const user = useUserStore()
    return{
      user
    }
  },
  
}
</script>
