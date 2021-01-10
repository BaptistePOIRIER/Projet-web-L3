const express = require('express')
const router = express.Router()
//const articles = require('../data/articles.js')
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
 connectionString: process.env.DATABASE_URL,
 ssl: {
     rejectUnauthorized: false
 }
})

//const client = new Client({
//  user: 'postgres',
//  host: 'localhost',
//  password: 'secret',
//  database: 'Projet-web-L3'
// })

client.connect()

/**
 * Cette route permet d'inscrire un utilisateur
 */
router.post('/register', async (req,res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

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

  // Récupération des email existants
  const result_email = await client.query({
    text: 'SELECT email FROM users'
  })
  
  // Email n'a pas le bon format
  if (!/\S+@\S+\.\S+/.test(email)) {
    res.status(400).json({ message: 'Email format is invalid'})
    return
  }

  // Email déjà utilisé dans la base de donnée ?
  const user_email = result_email.rows.find(a => a.email === email)
  if (user_email) {
    res.status(401).json({ message: 'Email already used'})
    return
  }

  // Mot de passe trop faible
  if (password.length < 4) {
    res.status(401).json({ message: 'Password too weak'})
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
    text: `SELECT definitions.id,definitions.definition,users.name,COALESCE(rating.rating,0) as rating,COALESCE(personal_rating.value, 0) as personal_rating
    FROM definitions 
    LEFT JOIN words ON definitions.word_id = words.id
    LEFT JOIN users ON definitions.user_id = users.id
    LEFT JOIN (SELECT votes.definition_id,SUM(votes.value) as rating FROM votes GROUP BY votes.definition_id) as rating ON rating.definition_id = definitions.id
    LEFT JOIN (SELECT votes.definition_id,votes.value FROM votes WHERE votes.user_id = $1) as personal_rating ON personal_rating.definition_id = definitions.id
    WHERE words.word = $2
    ORDER BY rating DESC`,
    values: [userId,word]
  })
  //console.log(result.rows)
  res.json(result.rows)
})

/**
 * Cette route permet de voter pour une définition
 */
router.post('/vote', async(req,res) => {
  const definitionId = parseInt(req.body.definitionId)
  const value = parseInt(req.body.value)
  console.log(definitionId,value)

  // Connecté ?
  if (typeof req.session.userId !== 'number') {
    res.status(401).send({ message: 'Not logged in' })
    return
  }

  // Suppresion de l'ancien vote:
  await client.query({
    text: 'DELETE FROM votes WHERE definition_id = $1 AND user_id = $2',
    values: [definitionId,req.session.userId]
  })

  // Création du nouveau vote:
  if (value != 0) {
    await client.query({
      text: 'INSERT INTO votes(user_id,definition_id,value) VALUES ($1,$2,$3)',
      values: [req.session.userId,definitionId,value]
    })
  }
  res.status(200).send({ message: 'Succesfully registered vote'})
})

/**
 * Cette route permet de créer une définition
 */
router.post('/define', async(req,res) => {
  const word = req.body.word.toLowerCase()
  const definition = req.body.definition
  console.log(word,definition)

  // Mot n'est pas vide
  if (word .length == 0) {
    res.status(404).send({ message: 'No word specified'})
    return
  }

  // Définition ne fait pas plus que 300 caractères
  if (definition.length > 300) {
    res.status(404).send({ message: 'Too many characters'})
    return
  }

  // Connecté ?
  if (typeof req.session.userId !== 'number') {
    res.status(401).send({ message: 'Not logged in' })
    return
  }

  // Get word ID
  const result = await client.query({
    text: `SELECT id FROM words WHERE word = $1`,
    values: [word]
  })

  // Get wordId
  var wordId = -1
  if (result.rows.length == 0) {
    await client.query({
      text: 'INSERT INTO words(word) VALUES ($1)',
      values: [word]
    })
    const result3 = await client.query({
      text: `SELECT id FROM words WHERE word = $1`,
      values: [word]
    })
    wordId = result3.rows[0].id
  }
  else {
    wordId = result.rows[0].id
  }

  // Definition already exisits ?
  const result_definitions = await client.query({
    text: `SELECT * FROM definitions WHERE word_id = $1`,
    values: [wordId]
  })
  const definitions = result_definitions.rows.find(a => a.definition === definition)
  if (definitions) {
    res.status(401).json({ message: 'Definition already exists'})
    return
  }

  // Stockage de la nouvelle définition
  await client.query({
    text: 'INSERT INTO definitions(word_id,definition,user_id) VALUES($1,$2,$3)',
    values: [wordId,definition,req.session.userId]
  })
  res.status(200).json({ message: 'Successfully registered'})
})

/**
 * Cette route permet de récuperer les contributions de l'utilisateur
 */
router.get('/contributions', async (req,res) => {
  const result = await client.query({
    text: `SELECT definitions.id,definitions.definition,words.word FROM definitions
    INNER JOIN words ON words.id = definitions.word_id
    WHERE definitions.user_id = $1`,
    values: [req.session.userId]
  })
  //console.log(result.rows)
  res.json(result.rows)
})

/**
 * Cette route permet de supprimer une contribution de l'utilisateur
 */
router.post('/contributions', async(req,res) => {
  const contributionId = parseInt(req.body.id)
  console.log(contributionId)

  // Connecté ?
  if (typeof req.session.userId !== 'number') {
    res.status(401).send({ message: 'Not logged in' })
    return
  }

  // Id correspond bien à une de ses contribution
  const result_contributions = await client.query({
    text: 'SELECT id FROM definitions WHERE user_id = $1',
    values: [req.session.userId]
  })
  const exists = result_contributions.rows.find(a => a.id === contributionId)
  if (!exists) {
    res.status(400).json({ message: 'This contribution is not yours'})
    return
  }

  // Suppression de la contribution
  await client.query({
    text: 'DELETE FROM definitions WHERE id = $1',
    values: [contributionId]
  })
  res.status(200).send({ message: 'Contribution succesfully deleted' })
})
 
/**
 * Cette route permet de récuperer les meilleurs définitions
 */
router.get('/top/best', async (req,res) => {
  const result = await client.query({
    text: `SELECT definitions.id,words.word,definitions.definition,users.name,COALESCE(rating.rating,0) as Rating
    FROM definitions 
    LEFT JOIN words ON definitions.word_id = words.id
    LEFT JOIN users ON definitions.user_id = users.id
    LEFT JOIN (SELECT votes.definition_id,SUM(votes.value) as rating FROM votes GROUP BY votes.definition_id) as rating ON rating.definition_id = definitions.id
    WHERE Rating > 0
    ORDER BY rating DESC`
  })
  //console.log(result.rows)
  res.json(result.rows)
})

 /**
 * Cette route permet de récuperer les pires définitions
 */
router.get('/top/worst', async (req,res) => {
  const result = await client.query({
    text: `SELECT definitions.id,words.word,definitions.definition,users.name,COALESCE(rating.rating,0) as Rating
    FROM definitions 
    LEFT JOIN words ON definitions.word_id = words.id
    LEFT JOIN users ON definitions.user_id = users.id
    LEFT JOIN (SELECT votes.definition_id,SUM(votes.value) as rating FROM votes GROUP BY votes.definition_id) as rating ON rating.definition_id = definitions.id
    WHERE Rating < 0
    ORDER BY rating ASC`
  })
  //console.log(result.rows)
  res.json(result.rows)
})

 /**
 * Cette route permet de récuperer les mots ayant le plus de définitions
 */
router.get('/top/most', async (req,res) => {
  const result = await client.query({
    text: `SELECT definitions.word_id,COUNT(definitions.id) as Rating,words.word FROM definitions
    INNER JOIN (SELECT words.id,words.word FROM words) as words ON definitions.word_id = words.id
    GROUP BY definitions.word_id,words.word
    ORDER BY rating DESC`
  })
  //console.log(result.rows)
  res.json(result.rows)
})

module.exports = router