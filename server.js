import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv'
import cors from 'cors';
import pkg from 'knex';

import {handleRegister} from './controllers/register.js'
import {handleSignIn} from './controllers/signin.js'
import {handleProfileGet} from './controllers/profile.js'
import {handleImage} from './controllers/image.js'
import {handleApiCall} from './controllers/image.js'

dotenv.config()

const { knex } = pkg;
const app = express();

app.use(express.json());
app.use(cors());

const PASSWORD = process.env.PASSWORD

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: PASSWORD,
		database: 'smart-brain',
	},
});

app.get('/', (req, res) => {
	res.send('Success');
});

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
