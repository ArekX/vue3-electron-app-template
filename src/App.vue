<template>
  <component :is="navigation.currentPage" />
</template>

<script>
import pages from './pages';
import navigation from './state/navigation';

export default {
  name: 'App',
  components: {
    ...pages
  },
  data() {
     return {
        navigation
     }
  },
  methods: {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
