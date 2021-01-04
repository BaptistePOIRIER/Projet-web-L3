<template>
    <div class="header">
        <img src="./assets/logo.svg">
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
        background-color: white;
        z-index: 9001;
    }
    .header {
        position: sticky;
        top: 0px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
    }

    .header img {
        width: 300px;
        height: 100px;
    }
    .header h1 {
        margin: auto;
    }
    .header nav {
        margin: 40px 40px 0px 80px
    }

    nav * {
            text-decoration: none;
            color: black;
            padding: 5px 20px;
            transition: 0.3s ease;
            border: 1px solid black
    }
        
    nav *:hover {
            color: white;
            background-color: black;
    }
</style>