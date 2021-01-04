<template>
  <div class="words">
    <div class="container" v-for="(word, i) in words" :key="i">
        <router-link :to="{ path: '/define', query: { word: word.word }}">
            <div class="word-container">
                <h4 class="word">{{word.word}}</h4>
            </div>
        </router-link>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    words: { type: Array }
  }
}
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
.words {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.word {
  color: #4ecca3;
}

.word-container {
  margin: 10px;
  padding: 10px;
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

.container * {
  text-decoration: none;
}
</style>