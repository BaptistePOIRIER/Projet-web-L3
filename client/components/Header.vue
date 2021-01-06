<template>
    <div class="container">
        <div class="left">
            <img class="left-content" src="./assets/logo.svg">
        </div>
        <div class="mid">
            <h1 class="mid-content"> Mon dictionnaire </h1>
        </div>
        <div class="right">
            <nav class="right-content">
                <router-link v-if="this.path != '/'" to='/'>Home</router-link>
                <router-link v-if="this.path != '/top'" to='/top'>TOP</router-link>
                <router-link v-if="connected" to='/profil'>Contribute</router-link>
                <router-link v-if="connected" to='/profil'>Profil</router-link>
                <router-link v-if="this.path != '/login' && this.path != '/register' && !connected" to='/login'>Connexion</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
module.exports = {
  props: {
      connected: Boolean
  },
  data () {
    return {
      path: ""
    }
  },
  mounted() {
      this.path = this.$router.currentRoute.path
      console.log(this.path)
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
.container {
    position: sticky;
    top: 0px;
    background-color: #393e46;
    border-bottom: #eeeeee 2px solid;
    border-top: #eeeeee 2px solid;

    display: flex;
}

.left {
    width: 50%;
    flex-shrink: 1;
    display: flex;
}

.left-content {
    width: 100px;
    margin-left: 20px;
}

.mid { 
    flex-shrink: 0;
}

.mid-content {
    margin: 20px;
    color: #eeeeee;
    font-size: 40px;
}

.right {
    width: 50%;
    flex-shrink: 1;
    display: flex;
    flex-direction: row-reverse;
}

.right-content {
    margin: 35px 20px 0px 70px;
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