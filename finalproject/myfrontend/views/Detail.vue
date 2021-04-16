<template>
  <div>
    <h1>Home</h1>
    <h1>Fluketo is very handsome id: {{id}}</h1>
  </div>
</template>

<script>
export default {
    created(){
        this.id = this.$route.params.id
        // console.log(this.$route.params.id);
    },
    data() {
      return {
          id:null
      }
    }
  }
</script>

<style scoped>
</style>