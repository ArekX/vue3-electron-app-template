<template>
  <HelloWorld/>
  <button @click="run">Test File Open Dialog</button>
  <div v-if="result">{{result}}</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
     return {
        result: null
     }
  },
  methods: {
    run() {
        window.MainApp.openDialog().then(r => this.result = r);
    }
  }
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
