<template>
    <div>
        <header-tpl class="header" :connected="connected"></header-tpl>
        <div class="card" v-for="(definition , i) in definitions" :key="i">
          <div class="content">
            <h4 v-if="i == 0"> * Meilleur définition *</h4>
            <h4 v-if="i != 0"> #{{i+1}}</h4>
            <h2 class="word">{{word.word}}</h2>
            <p>{{definition.definition}}</p>
          </div>
          <div class="rating">
            <p>{{definition.rating}} ★</p>
            <div v-if="connected" class="vote-container">
              <button class="vote up">+</button>
              <button class="vote down">-</button>
            </div>
          </div>
        </div>
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
      newDefinition: ''
    }
  },
  mounted () {
    console.log(this.$route.query.word)
    this.$emit('get-word', this.$route.query.word)
    this.getDefinitions()
  },
  methods: {
    getDefinitions() {
      this.$emit('get-definitions', this.$route.query.word)
    },
    submitNewDefinition() {
      const parameters = {
        newDefinition: this.newDefinition,
        id: this.word.id
      }
      this.$emit('submit-new-definition', parameters)
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
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border: 3px black solid
}

.word {
  text-decoration: underline;
}

.rating {
  text-align: center;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  border: 3px black solid
}

.vote-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.vote {
  border: 1px black solid;
  height: 25px;
  width: 25;
  margin: 5px;
  border-radius: 10px;
  transition: .4s;
  background: none;
  outline:none;
}

.vote:hover {
  background-color: rgb(0, 0, 0);
  cursor: pointer
}

.up:hover {
  border: 1px lime solid;
  color: lime;
  transition: .4s;
}

.down:hover {
  border: 1px red solid;
  color: red;
  transition: .4s;
}
</style>