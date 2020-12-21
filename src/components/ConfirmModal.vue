<template>
  <div class="c-modal">
    <div class="c-container">
      <a @click="$emit('close')">close</a>
      <p>{{message}}</p> 
      <form @submit.prevent>
        <button @click="$emit('confirm')" class="button">Yes</button>
        <button @click="$emit('close')" class="cancelbutton">No</button>  
      </form>
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

