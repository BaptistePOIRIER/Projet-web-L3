<template>
    <div>
        <header-tpl class="header" :connected="connected"></header-tpl>
        <div class="card" v-for="(definition , i) in definitions" :key="i">
          <div class="content">
            <h4 v-if="i == 0"> * Meilleur définition *</h4>
            <h4 v-if="i != 0"> #{{i+1}}</h4>
            <h2 class="word">{{word.word}}</h2>
            <p class="definition">{{definition.definition}}</p>
            <p>by {{definition.name}}</p>
          </div>
          <div class="rating">
            <p>{{definition.rating}} ★</p>
            <div v-if="connected" class="vote-container">
              <button v-on:click="vote(definition,'upvote')" class="vote up" v-bind:class="{ selected: definition.personal_rating == 1 }">+</button>
              <button v-on:click="vote(definition,'downvote')" class="vote down" v-bind:class="{ selected: definition.personal_rating == -1 }">-</button>
            </div>
          </div>
        </div>
        <button v-on:click="loadMore()">Load more</button>
        <form v-if="connected">
          <input type="text" v-model="newDefinition">
          <button @click="submitNewDefinition()">Submit</button>
        </form>
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
      definitions_amount: 3
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
        limit: this.definitions_amount
      }
      this.$emit('get-definitions', parameters)
    },
    submitNewDefinition() {
      const parameters = {
        newDefinition: this.newDefinition,
        id: this.word.id
      }
      this.$emit('submit-new-definition', parameters)
      this.getDefinitions()
    },
    vote(definition,vote) {
      const parameters = {
        word: this.word.word,
        limit: this.definitions_amount,
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
    loadMore() {
      this.definitions_amount += 1
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

.main-container {
  text-align: center;
}

.card {
  margin: 2% 20% 2% 20%;
  padding: 20px;
  background-color: #393e46;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px #eeeeee solid
}

.word {
  text-decoration: underline;
}

.rating {
  text-align: center;
  padding: 10px;
  background-color: #232931;
  color: #eeeeee;
  border-radius: 20px;
  border: 2px #4ecca3 solid
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
  border: 1px lime solid;
  color: lime;
}

.up:hover:not(.selected) {
  border: 1px lime solid;
  color: lime;
}

.up:hover.selected {
  border: 1px rgba(0, 255, 0, .5) solid;
  color: rgba(0, 255, 0, .5);
}

.down.selected {
  border: 1px red solid;
  color: red;
}

.down:hover:not(.selected) {
  border: 1px red solid;
  color: red;
}

.down:hover.selected {
  border: 1px rgba(255, 0, 0, .5) solid;
  color: rgba(255, 0, 0, .5);
}
</style>