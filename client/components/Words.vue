<template>
  <div class="words">
    <div class="container" v-for="(word, i) in words" :key="i">
        <router-link :to="{ path: '/define', query: { word: word.word }}">
            <div class="word">
                <h4>{{word.word}}</h4>
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
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    transform: translateY(0px);
    transition: 0.3s ease;
}

.word:hover {
    transform: translateY(-10px);
    transition: 0.3s ease;
    background-color: wheat;
    cursor: pointer;
}

.container * {
    text-decoration: none;
    color: black;
}
</style>