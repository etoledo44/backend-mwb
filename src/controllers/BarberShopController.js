const database = require('../helpers/database')
const Barbershop = database('Barbershop')
const User = database('User')

module.exports = {
    async Store(req, res){
        const {name, cep, street, number, city, state, id_user} = req.body
        const token = req.headers.authorization

        const response = await User.findOne({ where:{
            id: id_user
        }})

        if(response.token != token){
            res.status(401).send({message: 'Unauthorized user'})
        }else {
            const barbershop = {
                name,
                cep,
                street,
                number,
                city,
                state,
                id_user
            }
            try {
                const response = await Barbershop.create(barbershop)
                res.status(201).send({message: 'The barbershop was created!'})
            } catch (error) {
                res.status(500).send({message: 'The barbershop cannot be created'})
            }
        }
    },
    async Show(req, res){
        try {
            const response = await Barbershop.findAll()
            res.status(201).send(response)
        } catch (error) {
            res.status(500).send({message:'Cannot show barbershops!'})
        }
    },
    async ShowOne(req, res){
        const {id_barber} = req.params
        try {
            const response = await Barbershop.findOne({where:{id:id_barber}})
            if(response == null){
                res.status(404).send({message: 'This barbershop doesnt exists!'})
            }
            res.status(201).send(response)
        } catch (error) {
            res.status(500).send({message:'Cannot show barbershop!'})
        }
    },
    async Update(req, res){
        const {id_barber} = req.params
        const {name, cep, street, number, city, state, id_user} = req.body
        const token = req.headers.authorization

        const response = await User.findOne({ where:{
            id: id_user
        }})

        if(response.token != token){
            res.status(401).send({message: 'Unauthorized user'})
        }else {
            const barbershop = {
                name,
                cep,
                street,
                number,
                city,
                state,
                id_user
            }
            try {
                await Barbershop.update(barbershop, {where:{id:id_barber}})
                res.status(200).send({message: 'The barbershop was updated'})
            } catch (error) {
                res.status(500).send({message: 'The barbershop cannot be updated'})
            }
        }
    },
    async Delete(req, res){
        const {id_barber} = req.params
        const {id_user} = req.body

        const token = req.headers.authorization

        const response = await User.findOne({where:{id:id_user}})
        if(response.token != token){
            res.status(401).send({message: 'Unauthorized user!'})
        }else{
            try {
                await Barbershop.destroy({where: {id:id_barber}})
                res.status(200).send({message: 'Deleted!'})
            } catch (error) {
                res.status(500).send({message: 'Cannot be deleted!'})
            }
        }
    }
}