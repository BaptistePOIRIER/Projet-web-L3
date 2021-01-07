<template>
    <div>
      <header-tpl :connected="connected"></header-tpl>
      <div class="button-container">
        <button class="button select-best" v-on:click="clickButton(0)" v-bind:class="{ selected: selected == 0 }">Best definitions</button>
        <button class="button select-worst" v-on:click="clickButton(1)" v-bind:class="{ selected: selected == 1 }">Worst definitions</button>
        <button class="button select-most" v-on:click="clickButton(2)" v-bind:class="{ selected: selected == 2 }">Best word</button>
      </div>
      <div class="best" v-if="this.selected == 0">
        BEST
      </div>
      <div class="worst" v-if="this.selected == 1">
        WORST
      </div>
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
    connected: { type: Boolean }
  },
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    clickButton(button) {
      this.selected = button
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
</style>