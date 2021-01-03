<template>
    <div class="header">
        <img src="./assets/logo.svg">
        <h1>  Mon dictionnaire </h1>
        <nav>
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
    }

    .header img {
        width: 150px;
        height: 100px;
        margin: auto;
        border-radius: 35%;
    }
    .header h1 {
        margin: auto;
    }
    .header nav {
        margin: auto;
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