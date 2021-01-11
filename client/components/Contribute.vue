<template>
    <div>
      <header-tpl :connected="connected"></header-tpl>
      <div class="card">
        <h1 class="title">Nouvelle contribution</h1>
        <label class="label" for="word">Word</label>
        <input id="word" class="input" type="text" placeholder="Search a word" v-model="newDefinition.word" @input="searchWord" required>
        <div class="container" v-if="(newDefinition.word.length > 0 && words.length > 1) || (words.length == 1 && newDefinition.word != words[0].word)">
          <div v-for="(word, i) in words.slice(0,3)" :key="i">
            <div class="word-container" @click="completeWord(word.word)">
              <h4 class="word">{{word.word}}</h4>
            </div>
          </div>
        </div>
        <label class="label" for="definition">Definition</label>
        <textarea class="input" id="definition" type="text" v-model="newDefinition.definition" maxlength="300" required></textarea>
        <p class="character-limit">{{newDefinition.definition.length}}/300</p>
        <p class="error">{{errors.newDefinition}}</p>
        <button class="button" @click="submit()">Submit</button>
      </div>
      <div class="card">
        <h1 class="title">Mes contributions</h1>
        <div class="sub-card" v-for="(contribution,i) in contributions" :key="i">
          <div>
            <h4 class="white">{{contribution.word}}</h4>
            <p class="white">{{contribution.definition}}</p>
          </div>
          <button class="button" @click="deleteContribution(contribution.id)">Delete</button>
        </div>
      </div>
    </div>
</template>

<script>
const HeaderTemplate = window.httpVueLoader('./components/Header.vue')

module.exports = {
  props: {
    connected: { type: Boolean },
    words: { type: Array },
    errors: { type: Object },
    contributions: { type: Array }
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
    else {
      this.getContributions()
      this.errors.newDefinition = ''
    }
  },
  methods: {
    searchWord() {
      console.log(this.newDefinition.word)
      this.getWords()
      
    },
    getWords() {
      this.$emit('get-words', this.newDefinition.word.toLowerCase())
    },
    getContributions() {
      this.$emit('get-contributions')
    },
    completeWord(word) {
      this.newDefinition.word = word
      this.getWords()
    },
    submit() {
      this.errors.newDefinition = ''
      if (!this.$refs.form.checkValidity()) {
        this.errors.newDefinition = 'Remplissez tous les champs!'
        return
      }
      const parameters = {
        word: this.newDefinition.word,
        definition: this.newDefinition.definition
      }
      console.log(parameters)
      this.$emit('submit-new-definition', parameters)
      this.newDefinition = {
        word: '',
        definition: ''
      }
    },
    deleteContribution(id) {
      const parameters = {
        id: id
      }
      this.$emit('delete-contribution', parameters)
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

.card {
  margin: 50px 50px 20px 50px;
  padding: 15px;
  background-color: #393e46;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px #eeeeee solid
}

.title {
  color: #eeeeee;
  margin-bottom: 20px;
}

.label {
  color: #4ecca3;
}

.input {
  width: 300px;
  height: 40px;
  margin: 5px 0px 5px 0px;
  background-color: #eeeeee;
  border-radius: 10px;
  border: 3px solid #4ecca3;
}

.word {
  color: #4ecca3;
}

.white {
  color: #eeeeee;
}

.word-container {
  margin: 7px;
  padding: 4px;
  border: 2px solid #eeeeee;
  border-radius: 10px;
  transform: translateY(0px);
  transition: 0.3s ease;
}

.word-container:hover {
  transform: scale(1.3);
  border: 2px solid #4ecca3;
  background-color: #eeeeee;
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: row;
}

.v-for-container {
  margin-left: 20px;
}

.character-limit{
  color: #eeeeee;
  font-size: 14px;
}

.error {
  color: #e5707e;
  height: 30px;
}

.button {
    text-decoration: none;
    color: #eeeeee;
    padding: 6px 60px;
    margin: 5px;
    transition: 0.3s ease;
    border: 1px solid #eeeeee;
    background-color: #232931;
}
        
.button:hover {
    color: black;
    border-radius: 10px;
    cursor: pointer;
    background-color: #4ecca3;
}

.sub-card{
  margin: 10px 5px 10px 5px;
  padding: 15px;
  background-color: #232931;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px #eeeeee solid
}
</style>