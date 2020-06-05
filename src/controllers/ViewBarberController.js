const database = require('../helpers/database')
const Barbershop = database('Barbershop')
const User = database('User')
module.exports = {
    async ShowBarbershops(req, res){
        try {
            const response = await Barbershop.findAll()
            if(response == ''){
                return res.status(200).send({message: 'No barbers yet!'})
            }else{
                return res.status(200).send(response)
            }
        } catch (error) {
            return res.status(404).send({message: 'Not found!'})
        }
    },

    async ShowBarber(req, res){
        try {
            const response = await User.findAll({attributes: ['firstName', 'lastName', 'email']})
            if(response == ''){
                return res.send({message: 'No barbershops yet!'})
            }
            return res.status(200).send(response)
        } catch (error) {
            return res.status(404).send({message: 'Not found!'})
        }
    }
}