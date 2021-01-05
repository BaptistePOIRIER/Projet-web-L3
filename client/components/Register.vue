<template>
  <div class="main-container">
    <div class="card-container">
      <h2 class="top">Créer un compte</h2>
      <form class="form" ref="form">
        <input class="input" v-model="newAccount.name" placeholder="Name" type="text" required>
        <input class="input" v-model="newAccount.email" placeholder="Email" type="email" required>
        <input class="input" v-model="newAccount.password" placeholder="Password" type="password" required>
        <p class="error">{{errors.register}}</p>
      </form>
      <button class="button abort" @click="abortRegister()">Annuler</button>
      <button class="button register" @click="createAccount()">Valider</button>
      <br>
      <p class="bottom">Vous avez déjà un compte ?</p>
      <router-link class="connect" to='/login'>Connectez-vous !</router-link>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    errors: { type: Object }
  },
  data () {
    return {
      newAccount: {
          name: '',
          email: '',
          password: ''
      },
      errorsMessages: ['Email déja utilisé!','Username déja utilisé!']
    }
  },
  mounted() {
    this.errors.login = ''
  },
  methods: {
      createAccount() {
          if(this.$refs.form.checkValidity()) {
            this.$emit('create-account', this.newAccount)
            console.log(this.newAccount)
          }
          else {
            this.errors.register = 'Fill all inputs!'
          }
      },
      abortRegister() {
        router.push('/')
        this.errors.register = ''
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
  width: 100%;
  height: 100%;
  position: relative;
}
.card-container {
  position: absolute;
  background-color: #393e46;
  text-align: center;
  width: 500px;
  margin: 0% auto;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  margin: 10px;
  background-color: #eeeeee;
  border-radius: 10px;
  text-align: center;
  border: 3px solid #4ecca3;
}

.error {
  color: #e5707e;
  height: 30px;
}

.button {
    text-decoration: none;
    color: #eeeeee;
    padding: 7px 70px;
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

.button.register:hover {
  background-color: #4ecca3;
}

.button.abort:hover {
  background-color: #e5707e;
}

.bottom {
  background-color: #4ecca3;
  clip-path: polygon(100% 0, 100% 80%, 0 100%, 0% 20%);
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.connect {
  color: #eeeeee;
  text-decoration: none;
}

.connect:hover {
  text-decoration: underline;
}
</style>