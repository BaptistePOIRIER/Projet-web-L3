<template>
    <div>
        <header-tpl :connected="connected"></header-tpl>
        <h1>Contribute page</h1>
        <input type="text" v-model="this.newDefinition.word">
        <input type="text" v-model="this.newDefinition.definition">
        <button>Submit</button>
    </div>
</template>

<script>
  },
  components: {
    'header-tpl': HeaderTemplate
  },
  data () {
      return {
          newDefinition: {
              word: "",
              definition: ""
          }
      }
  },
  mounted() {
    if (!this.connected) {
      router.push('/login')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
</style>