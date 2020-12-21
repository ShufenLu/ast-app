<template>
  <div id="home">
   <section>
      <div class="col1">
        <div class="profile">
          <h3>Favorite</h3>
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
        </div>
      </div>
      <div class="col2">
        <FavoriteTable />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FavoriteTable from "@/components/FavoriteTable";
export default {  
  components: {
    FavoriteTable
  },  
  computed: {
    ...mapState(['userProfile'])
  },
}
</script>