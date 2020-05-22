const express = require('express')
const bodyParse = require('body-parser') //para conseguir transformar o que recebermos do body no post em objeto

const usersRoute = require('./routes/usersRoute')

const app=express()
const port=3000

app.use(bodyParse.urlencoded({ extended:false })) //agora estamos aptos a receber os dados a partir do formulário


usersRoute(app)

app.get('/',(req,resp)=>resp.send('Olá Mundo pelo Express'))

app.listen(port, ()=>console.log('API rodando na porta 3000'))
