<template>
    <div>
        <header-tpl :connected="connected"></header-tpl>
        <div class="card" v-for="(definition , i) in definitions.slice(0, this.definitions_shown)" :key="i">
          <div class="content">
            <h4 class="definition-rank" v-if="i == 0"> #Meilleur définition</h4>
            <h4 class="definition-rank" v-if="i != 0"> #{{i+1}}</h4>
            <h2 class="word">{{word.word}}</h2>
            <p class="definition">{{definition.definition}}</p>
            <p class="author">Proposée par <span class="author-name">{{definition.name}}</span></P>
          </div>
          <div class="rating">
            <p>{{definition.rating}} ★</p>
            <div v-if="connected" class="vote-container">
              <button v-on:click="vote(definition,'upvote')" class="vote up" v-bind:class="{ selected: definition.personal_rating == 1 }">+</button>
              <button v-on:click="vote(definition,'downvote')" class="vote down" v-bind:class="{ selected: definition.personal_rating == -1 }">-</button>
            </div>
          </div>
        </div>
        <div class="container-show">
          <button class="button more" v-if="this.definitions_shown < this.definitions.length" v-on:click="showMore()">Afficher plus</button>
          <button class="button less" v-if="this.definitions_shown > 3" v-on:click="showLess()">Afficher moins</button>
        </div>
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
    word: { type: Object },
    definitions: { type: Array }
  },
  data () {
    return {
      newDefinition: '',
      definitions_shown: 3,
    }
  },
  mounted () {
    this.$emit('get-word', this.$route.query.word)
    this.getDefinitions()
  },
  methods: {
    getDefinitions() {
      const parameters = {
        word: this.$route.query.word,
      }
      this.$emit('get-definitions', parameters)
    },
    vote(definition,vote) {
      const parameters = {
        word: this.word.word,
        definitionId: definition.id,
        value: 0
      }

      // Click upvote
      if (vote == 'upvote') {
        if (definition.personal_rating != 1) {
          parameters.value = 1
        }
      }

      // Click downvote
      if (vote == 'downvote') {
        if (definition.personal_rating != -1) {
          parameters.value = -1
        }
      }
      console.log(parameters)
      this.$emit('vote', parameters)
    },
    showMore() {
      this.definitions_shown += 3
      this.getDefinitions()
    },
    showLess() {
      this.definitions_shown -= 3
      this.getDefinitions()
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
  margin: 2% 20% 2% 20%;
  padding: 15px;
  background-color: #393e46;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px #eeeeee solid
}

.definition-rank {
  margin-bottom: 20px;
  color: #b3b3b3;
}

.word {
  text-decoration: underline;
  color: #eeeeee;
}

.definition {
  color: #eeeeee;
}

.author {
  margin-top: 20px;
  color: #b3b3b3;
  font-size: 14px;
}

.author-name{
  text-decoration: underline;
  color: #eeeeee;
}

.rating {
  text-align: center;
  padding: 10px;
  background-color: #232931;
  color: #eeeeee;
  border-radius: 20px;
  border: 2px #eeeeee solid;
  min-width: 50px;
}

.vote-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.vote {
  border: 1px black solid;
  height: 25px;
  width: 25px;
  margin: 5px;
  border-radius: 10px;
  outline: none;
}

.vote:not(.selected) {
  background: none;
}

.vote.selected {
  background-color: rgb(0, 0, 0)  
}

.vote:hover:not(.selected) {
  background-color: rgb(0, 0, 0);
  cursor: pointer
}

.vote:hover.selected {
  cursor: pointer
}

.up.selected {
  border: 2px #4ecca3 solid;
  color: #4ecca3;
}

.up:hover:not(.selected) {
  border: 2px #4ecca3 solid;
  color: #4ecca3;
}

.up:hover.selected {
  border: 2px #4ecca3aa solid;
  color: #4ecca3aa;
}

.down.selected {
  border: 2px #e5707e solid;
  color: #e5707e;
}

.down:hover:not(.selected) {
  border: 2px #e5707e solid;
  color: #e5707e;
}

.down:hover.selected {
  border: 2px #e5707eaa solid;
  color: #e5707eaa;
}

.container-show {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.button {
    text-decoration: none;
    color: #eeeeee;
    padding: 6px 60px;
    margin: 5px;
    transition: 0.3s ease;
    border: 1px solid #eeeeee;
    background-color: #393e46;
    outline: none;
}
        
.button:hover {
    color: black;
    border-radius: 10px;
    cursor: pointer;
}

.button.more:hover {
  background-color: #4ecca3;
}

.button.less:hover {
  background-color: #e5707e;
}
</style>