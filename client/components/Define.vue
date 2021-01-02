<template>
    <div>
        <header-tpl class="header" :connected="connected"></header-tpl>
        <h1>Définition de {{word.word}}</h1>
    </div>
</template>

<script>
const HeaderTemplate = window.httpVueLoader('./components/Header.vue')

module.exports = {
  components: {
    'header-tpl': HeaderTemplate
  },
  props: {
    connected: { type: Boolean },
    word: { type: Object }
  },
  data () {
    return {
      parameters: {}
    }
  },
  mounted () {
    this.parameters = this.$route.query
    this.$emit('get-word', this.parameters.word)
  }
}
</script>

<style scoped>
.visu-container {
  height: 60vh;
  background-color: aquamarine;
  text-align: center;
}
</style>