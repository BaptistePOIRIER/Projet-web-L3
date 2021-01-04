const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')
const Define = window.httpVueLoader('./components/Define.vue')
const Top = window.httpVueLoader('./components/Top.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register},
  { path: '/login', component: Login},
  { path: '/profil', component: Profil},
  { path: '/define', component: Define},
  { path: '/top', component: Top}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    words: [],
    word: {},
    definitions: [],
    connected: false
  },
  async mounted () {
    const res = await axios.get('api/words')
    this.words = res.data
  },
  methods: {
    async createAccount (newAccount) {
      const res = await axios.post('api/register', newAccount)
      console.log(res.data)
    },
    async login (loginInfos) {
      try {
        const res = await axios.post('api/login', loginInfos)
        console.log(res.data)
        this.connected = true
        router.push('/')
      }
      catch {
        this.connected = false
      }
    },
    async logout () {
      this.connected = false
      const res = await axios.post('api/logout')
      console.log(res.data)
      router.push('/')
    },
    async getWords (like) {
      const res = await axios.get('api/words/' + like)
      this.words = res.data
      console.log(res.data)
    },
    async getWord (word) {
      const res = await axios.get('api/word/' + word)
      this.word = res.data
      console.log(res.data)
    },
    async getDefinitions (word) {
      const res = await axios.get('api/definitions/' + word)
      this.definitions = res.data
      console.log(res.data)
    },
    async vote (parameters) {
      const res = await axios.post('api/vote', parameters)
      console.log(res.data)
    },
    async submitNewDefinition (parameters) {
      const res = await axios.post('api/define', parameters)
      console.log(res.data)
    }
  }
})
