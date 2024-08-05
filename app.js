
import express from "express";


const app = express()
const PORT = 8000

import {config} from './dbconfig.js'

import pkg from 'pg'
const {Client} = pkg;

import cors from 'cors'
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.get('/canciones',async (req, res) => {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select * from public.canciones");
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })
  

app.get('/artistas',async (req, res) => {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select * from public.artistas");
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })


  app.get('/artistas/:id/canciones',async (req, res) => {
    const {id} = req.params;
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select c.* from public.canciones c, public.albumes a where c.album = a.id and artista=$1", [id]);
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  })