<template>
  <div>This is a second page</div>
  <div>
    <button @click="back()">Go back to main page.</button>
  </div>
</template>

<script>
import navigation from '../../state/navigation';

export default {
  name: 'SecondPage',
  methods: {
    back() {
        navigation.goBack();
    }
  }
}
</script>

<style>

</style>
