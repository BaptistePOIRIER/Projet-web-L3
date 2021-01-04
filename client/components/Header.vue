<template>
    <div class="header">
        <router-link to='/'>
            <img src="./assets/logo.svg">
        </router-link>
        <h1>  Mon dictionnaire </h1>
        <nav>
            <router-link to='/top'>TOP</router-link>
            <router-link v-if="connected" to='/profil'>Profil</router-link>
            <router-link v-else to='/login'>Connexion</router-link>
        </nav>
    </div>
</template>

<script>
module.exports = {
  props: {
      connected: Boolean
  }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: none;
}
.header {
    position: sticky;
    top: 0px;
    background-color: #393e46;
    border-bottom: #eeeeee 2px solid;
    border-top: #eeeeee 2px solid;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
}

.header img {
    width: 300px;
    height: 100px;
    transition: .4s;
}

.header img:hover {
    transform: scale(1.2);
}

.header h1 {
    margin: auto;
    color: #eeeeee;
    font-size: 40px;
}
.header nav {
    margin: 35px 20px 0px 70px
}

nav * {
    text-decoration: none;
    color: #eeeeee;
    padding: 5px 20px;
    margin: 5px;
    transition: 0.3s ease;
    border: 1px solid #eeeeee;
    background-color: #232931;
}
        
nav *:hover {
    color: black;
    background-color: #4ecca3;
    border-radius: 10px;
}
</style>