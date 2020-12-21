<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>Near Earth Asteriod</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/favorite">Favorite</router-link>
          </li>
          <li><a @click="logout()">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
