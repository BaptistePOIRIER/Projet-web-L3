<template>
  <div class="main-container">
    <header-tpl :connected="connected"></header-tpl>
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
  mounted() {
    this.getWords()
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

.search-container {
  text-align: center;
  margin: 5%
}

.search {
  text-align: center;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  outline: none;
  background-color: #4ecca3;
  border: 3px #eeeeee solid;
  color: #eeeeee;
  transition: .4s;
}

.search:hover{
  cursor: pointer;
}

.search:focus {
  width: 300px;
  color: #eeeeee;
  cursor: text;
}

::placeholder {
  color: #393e4699;
  font-style: italic;
  transition: .4s;
}

.search:hover::placeholder {
  color: #eeeeee;
}
</style>
