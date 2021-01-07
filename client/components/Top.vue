<template>
    <div>
      <header-tpl :connected="connected"></header-tpl>
      <div class="button-container">
        <button class="button select-best" v-on:click="clickButton(0)" v-bind:class="{ selected: selected == 0 }">Best definitions</button>
        <button class="button select-worst" v-on:click="clickButton(1)" v-bind:class="{ selected: selected == 1 }">Worst definitions</button>
        <button class="button select-most" v-on:click="clickButton(2)" v-bind:class="{ selected: selected == 2 }">Best word</button>
      </div>
      <div v-if="this.selected == 0">
        <div class="card" v-for="(element , i) in top" :key="i">
          <div class="content">
            <h4 class="definition-rank" v-if="i == 0"> #Meilleur définition</h4>
            <h4 class="definition-rank" v-if="i != 0"> #{{i+1}}</h4>
            <h2 class="word">{{element.word}}</h2>
            <p class="definition">{{element.definition}}</p>
            <p class="author">Written by <span class="author-name">{{element.name}}</span></P>
          </div>
          <div class="rating">
            <p>{{element.rating}} ★</p>
          </div>
        </div>
      </div>
      <div v-if="this.selected == 1">
        <div class="card" v-for="(element , i) in top" :key="i">
          <div class="content">
            <h4 class="definition-rank" v-if="i == 0"> #Pire définition</h4>
            <h4 class="definition-rank" v-if="i != 0"> #{{i+1}}</h4>
            <h2 class="word">{{element.word}}</h2>
            <p class="definition">{{element.definition}}</p>
            <p class="author">Written by <span class="author-name">{{element.name}}</span></P>
          </div>
          <div class="rating">
            <p>{{element.rating}} ★</p>
          </div>
        </div>      </div>
      <div class="most" v-if="this.selected == 2">
        MOST
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
    top: { type: Array },
  },
  data () {
    return {
      selected: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.selected == 0) {
        this.getBestDefinitions()
      }
      if (this.selected == 1) {
        this.getWorstDefinitions()
      }
      if (this.selected == 2) {
        this.getMostDefinitions()
      }
    },
    getBestDefinitions() {
      this.$emit('get-top-best')
    },
    getWorstDefinitions() {
      this.$emit('get-top-worst')
    },
    getMostDefinitions() {
      this.$emit('get-top-most')
    },
    clickButton(button) {
      this.selected = button
      this.getData()
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

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.button {
    text-decoration: none;
    color: #eeeeee;
    padding: 6px 40px;
    margin: 10px;
    transition: 0.3s ease;
    border: 2px solid #eeeeee;
    background-color: #393e46;
    outline: none;
    font-size: 20px;
}
       
.button:hover:not(.selected) {
    color: black;
    border-radius: 20px;
    cursor: pointer;
    background-color: #4ecca3;
}

.button.selected {
  color: black;
  border-radius: 20px;
  background-color: #4ecca3;
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
  border: 2px #eeeeee solid
}
</style>