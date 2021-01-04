<template>
  <div class="main-container">
    <h2 class="top">Pour contribuer, connectez-vous !</h2>
    <form class="form">
      <input class="input" v-model="loginInfos.email" placeholder="Email">
      <input class="input" v-model="loginInfos.password" placeholder="Password">
    </form>
    <button class="button abort" @click="abortLogin()">Annuler</button>
    <button class="button connect" @click="login()">Se connecter</button>
    <br>
    <p class="bottom">Vous n'avez pas de compte ?</p>
    <router-link class="register" to='/register'>Inscrivez-vous !</router-link>
  </div>
</template>

<script>
module.exports = {
  props: {
    connected: { type: Boolean }
  },
  data () {
    return {
      loginInfos: {
          email: '',
          password: ''
      }
    }
  },
  mounted () {
    if (this.connected) {
      router.push('/')
    }
  },
  methods: {
      login() {
        this.$emit('login', this.loginInfos)
      },
      abortLogin() {
        router.push('/')
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
  background-color: #393e46;
  text-align: center;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  height: 500px;
  border-radius: 20px;
}

.top {
  background-color: #4ecca3;
  color: black;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px #eeeeee solid
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input {
  width: 80%;
  height: 40px;
  background-color: #eeeeee;
  border-radius: 10px;
  text-align: center;
}

.button {
    text-decoration: none;
    color: #eeeeee;
    padding: 5px 20px;
    margin: 5px;
    transition: 0.3s ease;
    border: 1px solid #eeeeee;
    background-color: #232931;
}
        
.button:hover {
    color: black;
    border-radius: 10px;
    cursor: pointer;
}

.button.connect:hover {
  background-color: #4ecca3;
}

.button.abort:hover {
  background-color: #e5707e;
}

.bottom {
  background-color: #4ecca3;
  clip-path: polygon(100% 0, 100% 80%, 0 100%, 0% 20%);
  height: 40px;
}

.register {
  color: #eeeeee
}
</style>
