<template>
  <HelloWorld/>
  <button @click="run">Test File Open Dialog</button>
  <div v-if="result">{{result}}</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

const Interop = window.Interop;

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
    async run() {
        this.result = await Interop.dialog.openDialog();
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
