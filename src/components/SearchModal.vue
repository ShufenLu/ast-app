<template>
  <div class="c-modal">
    <div class="c-container">
      <a @click="$emit('close')">close</a>
      <p>Search Asteroid by ID</p>
      <form @submit.prevent>
        <input v-model.trim="asteroidID" placeholder="eg. 1234567"/>
        <button @click="$emit('close', asteroidID)" :disabled="asteroidID == ''" class="button">Search</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      asteroidID: ''
    }
  },
  created() {    
    this.asteroidID = '';
    
  }
}
</script>
