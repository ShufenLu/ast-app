<template>
  <div id="home">
   <section>
      <div class="col1">
        <div class="profile">
          <h3>Home</h3>
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
        </div>
      </div>
      <div class="col2">
        <AsteroidTable />
      </div>
    </section>
  </div>
</template>

<script>
import AsteroidTable from "@/components/AsteroidTable";
import { mapState } from 'vuex'

export default {  
  components: {
    AsteroidTable
  },  
  computed: {
    ...mapState(['userProfile'])
  },
}
</script>