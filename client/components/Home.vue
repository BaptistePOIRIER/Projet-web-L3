<template>
  <div>
    <header-tpl class="header" :connected="connected"></header-tpl>
    <words-tpl :words="words"></words-tpl>
  </div>
</template>

<script>
const HeaderTemplate = window.httpVueLoader('./components/Header.vue')
const WordsTemplate = window.httpVueLoader('./components/Words.vue')

module.exports = {
  components: {
    'header-tpl': HeaderTemplate,
    'words-tpl': WordsTemplate
  },
  props: {
    connected: { type: Boolean },
    words: { type: Array }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  
}
.header {
  width: 100%;
}
</style>
