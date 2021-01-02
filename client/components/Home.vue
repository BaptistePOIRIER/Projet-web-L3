<template>
  <div>
    <header-tpl class="header" :connected="connected"></header-tpl>
    <input class="search" type="text" placeholder="Search" v-model="search" @input="functionTest">
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
  },
  data () {
    return {
      search: ""
    }
  },
  methods: {
    functionTest() {
      console.log(this.search)
      this.getWords()
    },
    getWords() {
      this.$emit('get-words', this.search.toLowerCase())
    }
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

.search {
  text-align: center;
}
</style>
