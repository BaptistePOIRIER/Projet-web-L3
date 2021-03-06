const Home = window.httpVueLoader('./components/Home.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')
const Define = window.httpVueLoader('./components/Define.vue')
const Top = window.httpVueLoader('./components/Top.vue')
const Contribute = window.httpVueLoader('./components/Contribute.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register},
  { path: '/login', component: Login},
  { path: '/profil', component: Profil},
  { path: '/define', component: Define},
  { path: '/top', component: Top},
  { path: '/contribute', component: Contribute}

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
    connected: false,
    user: {},
    errors: {
      register: '',
      login: '',
      newDefinition: '',
      profil: ''
    },
    top: [],
    contributions: []
  },
  async mounted () {
    const res = await axios.get('api/words')
    this.words = res.data
    this.me()
  },
  methods: {
    async createAccount (newAccount) {
      try {
        const res = await axios.post('api/register', newAccount)
        console.log(res.data)
        router.push('/login')
      }
      catch (error) {
        this.errors.register = error.response.data.message
        console.log(error.response.data);
      }
    },
    async login (loginInfos) {  
      try {
        const res = await axios.post('api/login', loginInfos)
        console.log(res.data)
        this.me()
        router.push('/')
      }
      catch (error) {
        this.errors.login = error.response.data.message
        this.connected = false
        console.log(error.response.data);
      }
    },
    async me() {
      try {
        const res = await axios.get('api/me')
        this.user = res.data
        this.connected = true
      }
      catch (error) {
        console.log(error.response.data);
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
    async getDefinitions (parameters) {
      const res = await axios.get('api/definitions/' + parameters.word)
      this.definitions = res.data
      console.log(res.data)
    },
    async vote (parameters) {
      const res = await axios.post('api/vote', parameters)
      console.log(res.data)
      const res2 = await axios.get('api/definitions/' + parameters.word)
      this.definitions = res2.data
    },
    async submitNewDefinition (parameters) {
      try {
        const res = await axios.post('api/define', parameters)
        console.log(res.data)
      }
      catch (error) {
        this.errors.newDefinition = error.response.data.message
        console.log(error.response.data);
      }
    },
    async getContributions() {
      const res = await axios.get('api/contributions')
      this.contributions = res.data
      console.log(res.data)
    },
    async deleteContribution(parameters) {
      const res = await axios.post('api/contributions', parameters)
      console.log(res.data)
      this.getContributions()
    },
    async getTopBest() {
      const res = await axios.get('api/top/best')
      this.top = res.data
      console.log(res.data)
    },
    async getTopWorst() {
      const res = await axios.get('api/top/worst')
      this.top = res.data
      console.log(res.data)
    },
    async getTopMost() {
      const res = await axios.get('api/top/most')
      this.top = res.data
      console.log(res.data)
    },
    async editName(parameters) {
      const res = await axios.post('api/me', parameters)
      this.me()
    }
  }
})
