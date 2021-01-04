<template>
  <div class="main-container">
    <header-tpl class="header" :connected="connected"></header-tpl>
    <div class="search-container">
      <input class="search" type="text" placeholder="Search a word" v-model="search" @input="functionTest">
    </div>
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

.search-container {
  text-align: center;
  margin: 5%
}

.search {
  text-align: center;
  width: 30%;
  height: 5%;
  border-radius: 10px;
  font-size: 20px;
  outline: none;
  transition: .3s;
  background-color: #4ecca3;
  border: 3px #eeeeee solid;
  color: #eeeeee;
}

::placeholder {
  color: #393e46cc;
  font-style: italic;
}
</style>
