<template>
  <HelloWorld/>
  <button @click="run">Test File Open Dialog</button>
  <div v-if="result">{{result}}</div>
  <PageSpecific />
  <div>
    <button @click="nextPage()">Test next page</button>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue';
import PageSpecific from './PageSpecific.vue';

import navigation from '../../state/navigation';


const Interop = window.Interop;

export default {
  name: 'Main',
  components: {
    HelloWorld,
    PageSpecific
  },
  data() {
     return {
        result: null
     }
  },
  methods: {
    async run() {
        this.result = await Interop.dialog.openDialog();
    },
    nextPage() {
        navigation.goTo('SecondPage');
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
