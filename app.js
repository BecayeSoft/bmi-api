const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Imc = require('./models/Imc')

const app = express()

// Connecting to MongoDB
username = 'becaye'
password = 'u06pGuMODgSCCYAi'
database = 'imc-db'

const uri = `mongodb+srv://mycluster.dntqr.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { 
	user: username,
	pass: password,
	dbName: database,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Connection to MongoDB was successful'))
	.catch((err) => console.err('Connexion to MongoDB failed\n' + err))


// CORS (Cross Origin Ressource Sharing) Autorisation 
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
	next()
})


// parse client requests ton json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});


/**
 * Add an Imc to the database for post request to 'api/imc'
 */
app.post('/api/imc', (req, res, next) => {

	// Delete ID (ID will be auto-generated by the database)
	delete req.body._id

	// Create a new Imc object
	const imc = new Imc({
		...req.body
	})

	// Save
	imc.save()
		.then(() => res.status(201).json({ message: 'Imc Saved!' }))

})


/**
 * Get all the IMC from the database for get requests to: 'api/imc'
 */
app.get('/api/imc', (req, res, next) => {
	Imc.find()
		.then(imcs => res.status(200).json(imcs))
		.catch(error => res.status(400).json({ error }))
})

// export the Express app
module.exports = app