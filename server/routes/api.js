const express = require('express')
const router = express.Router()
//const articles = require('../data/articles.js')
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'secret',
  database: 'Projet-web-L3'
 })

client.connect()

/**
 * Cette route permet d'inscrire un utilisateur
 */
router.post('/register', async (req,res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  // Récupération des email existants
  const result_email = await client.query({
    text: 'SELECT email FROM users'
  })
  
  // Email déjà utilisé dans la base de donnée ?
  const user_email = result_email.rows.find(a => a.email === email)
  if (user_email) {
    res.status(400).json({ message: 'Email already used'})
    return
  }
  
  // Récupération des noms existants
  const result_name = await client.query({
    text: 'SELECT name FROM users'
  })
  
  // Nom déjà utilisé dans la base de donnée ?
  const user_name = result_name.rows.find(a => a.name === name)
  if (user_name) {
    res.status(400).json({ message: 'Name already used'})
    return
  }

  // Hashage du mot de passe
  const hash = await bcrypt.hash(password, 10)
  
  // Stockage de l'utilisateur
  client.query({
    text: 'INSERT INTO users(name,email,password) VALUES ($1,$2,$3)',
    values: [name,email,hash]
  })
  res.status(200).json({ message: 'Successfully registered'})
})
  
/**
 * Cette route permet à l'utilisateur de se connecter
 */
router.post('/login', async (req,res) => {
  const email = req.body.email
  const password = req.body.password
  
  // Récupération des email existants
  const result = await client.query({
    text: 'SELECT email,password,id FROM users'
  })
  
  // Utilisateurs absent de la base de donnée ?
  const user = result.rows.find(a => a.email === email)
  if (!user) {
    res.status(400).json({ message: 'Email cannot be found'})
    return
  }
  
  // Vérification du mot de passe
  if (await bcrypt.compare(password, user.password)) {
    // Déjà connecté
    if(req.session.userId == user.id) {
      res.status(401).json({ message: 'Already connected'})
    }else {
      // Connexion
      req.session.userId = user.id
      res.status(200).json({ message: 'Successfully connected'})
    }
    return
  }
  // Mauvais mot de passe
  res.status(400).json({ message: 'Wrong password'})
})

/**
* Cette route permet de renvoyer l'utilisateur connecté
*/
router.get('/me', async (req,res) => {
  // Connecté ?
  if (typeof req.session.userId !== 'number') {
    res.status(401).send({ message: 'Not logged in' })
    return
  }

  // Récupération des email existants
  const result = await client.query({
    text: 'SELECT email,id FROM users'
  })

  // Récupération de l'utilisateur connecté
  const user = result.rows.find(a => a.id === req.session.userId)
  res.status(200).json(user)
})

/**
 * Cette route permet de deconnecter l'utilisateur
 */
router.post('/logout', async (req,res) => {
  req.session.destroy()
  res.status(200).json({ message: 'Succesfully disconnected'})
})

/**
 * Cette route permet de récupérer tous les mots
 */
router.get('/words', async (req,res) => {
  // Récupération de tous les mots
  const result = await client.query({
    text: 'SELECT * FROM words ORDER BY word'
  })
  console.log(result.rows)
  res.json(result.rows)
})

/**
 * Cette route permet de récupérer un mot contenant ":like"
 */
router.get('/words/:like', async (req,res) => {
  const like = '%' + req.params.like + '%'
  const result = await client.query({
    text: "SELECT * FROM words WHERE word LIKE $1 ORDER BY word",
    values: [like]
  })
  console.log(result.rows)
  res.json(result.rows)
})

/**
 * Cette route permet de récupérer le mot recherché
 */
router.get('/word/:word', async (req,res) => {
  const word = req.params.word
  const result = await client.query({
    text: 'SELECT * FROM words WHERE word = $1',
    values: [word]
  })
  console.log(result.rows[0])
  res.json(result.rows[0])
})

/**
 * Cette route permet de récupérer les définitions du mot recherché
 */
router.get('/definitions/:word', async(req,res) => {
  const word = req.params.word
  const userId = req.session.userId || -1
  const result = await client.query({
    text: `SELECT definitions.definition,users.name,COALESCE(rating.rating,0) as rating,COALESCE(personal_rating.value, 0) as personal_rating
    FROM definitions 
    LEFT JOIN words ON definitions.word_id = words.id
    LEFT JOIN users ON definitions.user_id = users.id
    LEFT JOIN (SELECT votes.definition_id,SUM(votes.value) as rating FROM votes GROUP BY votes.definition_id) as rating ON rating.definition_id = definitions.id
    LEFT JOIN (SELECT votes.definition_id,votes.value FROM votes WHERE votes.user_id = $1) as personal_rating ON personal_rating.definition_id = definitions.id
    WHERE words.word = $2`,
    values: [userId,word]
  })
  console.log(result.rows)
  res.json(result.rows)
})


/**
 * Cette route permet de créer une définition
 */
router.post('/define', async(req,res) => {
  const id = parseInt(req.body.id)
  const newDefinition = req.body.newDefinition
  console.log(id,newDefinition)

  // Connecté ?
  if (typeof req.session.userId !== 'number') {
    res.status(401).send({ message: 'Not logged in' })
    return
  }

  // Stockage de la nouvelle définition
  client.query({
    text: 'INSERT INTO definitions(word_id,user_id,definition,rating,upvotes,downvotes) VALUES ($1,$2,$3,$4,$5,$6)',
    values: [id,req.session.userId,newDefinition,0,0,0]
  })
  res.status(200).json({ message: 'Successfully registered'})
})
module.exports = router