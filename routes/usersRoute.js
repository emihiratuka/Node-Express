const fs = require('fs')
const { join } = require('path')
const filePath = join(__dirname, 'users.json')  //__dirname é para incluir o path do diretório ao nome do arquivo


const getUsers = () => { 
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath) // se existe lê o arquivo
        :[] //se não existir retorna vazio
    try{ // cria o try catch para tratar qualquer erro que vier a ocorrer
        return JSON.parse(data) //retorna um parse
    }
    catch(error){
        return [] 
    }

}


const saveUser = (users)=> fs.writeFileSync(filePath, JSON.stringify(users,null,'\t')) //o JSON.strngfy transforma o Body em json para poder salvar

const usersRoute = (app) => {   //o app é o nosso aplicativo
    app.route('/users/:id?')    //users/:id é o id que será enviado para alterar ou deletar um usuário
        .get((req,res)=> {
            const users = getUsers()
            res.send({users})
        })

        .post((req,res)=> {
            const users = getUsers()
            users.push(req.body)
            saveUser(users)

            res.status(201).send('OK')

        })

        .put((req, res)=> {
            const users = getUsers()
            saveUser(users.map(user => {    //o map serve para criar um novo objeto atualizando esse usuário que estamos passando o ID
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            res.status(200).send('ALTERADO')
        })

        .delete((req, res)=> {
            const users = getUsers()
            saveUser(users.filter(user => user.id !== req.params.id)) //vai salvar todos menos o que for diferente
            res.status(200).send('DELETADO')
        })
}

module.exports = usersRoute

