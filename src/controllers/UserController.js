const database = require('../helpers/database')
const User = database('User')
const Barbershop = database('Barbershop')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


module.exports = {
    async Store (req, res){
        const {firstName, lastName, email, password} = req.body
        const salt = 10
        
        try {
            const hashpsw = await bcrypt.hash(password, salt)
            const token = crypto.randomBytes(6).toString('HEX')

            const user = {
                firstName,
                lastName, 
                email,
                password: hashpsw,
                token
            }
            const response = await User.create(user)
            res.status(200).send({message: 'Created!'})

        } catch (error) {
            res.status(500).send({message: 'Error to encrypt'})
        }
    },
    async Show(req, res){
        try {
            const response = await User.findAll({
                where:{
                    id: 1
                },
                include: [
                    {
                        model: Barbershop,
                        as: 'Barbershops'
                    }
                ]
            })
            res.json(response)
        } catch (error) {
            console.log('exibir barbearias')
        }
    }
}
