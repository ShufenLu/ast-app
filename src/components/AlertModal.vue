<template>
  <div class="c-modal">
    <div class="c-container">
      <a @click="$emit('close')">close</a>
      <p>{{message}}</p>      
    </div>
  </div>
</template>

<script>

export default {  
  props:{
      message: String
  }
}
</script>
