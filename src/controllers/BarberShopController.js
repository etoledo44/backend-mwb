const database = require('../helpers/database')
const Barbershop = database('Barbershop')
const User = database('User')

module.exports = {
    async Store(req, res) {
        const {
            name,
            phone,
            schedule,
            cep,
            street,
            number,
            city,
            state,
            id_user
        } = req.body
        const token = req.headers.authorization

        const response = await User.findOne({
            where: {
                id: id_user
            }
        })

        if (response.token != token) {
            return res.status(401).send({ message: 'Unauthorized user' })
        } else {
            const barbershop = {
                name,
                phone,
                schedule,
                cep,
                street,
                number,
                city,
                state,
                id_user
            }
            try {
                const response = await Barbershop.create(barbershop)
                return res.status(201).send({ message: 'The barbershop was created!' })
            } catch (error) {
                return res.status(500).send({ message: 'The barbershop cannot be created' })
            }
        }
    },
    async Show(req, res) {
        const token = req.headers.authorization
        try {
            const existUser = await User.findOne({ where: { token } })
            if (existUser == null) {
                return res.status(403).send({ message: "Unauthorized user" })
            } else {
                const response = await Barbershop.findAll({ where: { id_user: existUser.id } })
                return res.status(201).send(response)
            }
        } catch (error) {
            console.log('erro ao verificar usario', error)
        }
        try {

        } catch (error) {
            return res.status(500).send({ message: 'Cannot show barbershops!' })
        }
    },
    async ShowOne(req, res) {
        const { id_barber } = req.params
        try {
            const response = await Barbershop.findOne({ where: { id: id_barber } })
            if (response == null) {
                return res.status(404).send({ message: 'This barbershop doesnt exists!' })
            }
            res.status(201).send(response)
        } catch (error) {
            return res.status(500).send({ message: 'Cannot show barbershop!' })
        }
    },
    async Update(req, res) {
        const { id_barber } = req.params
        const { name, cep, street, number, city, state, id_user } = req.body
        const token = req.headers.authorization

        const response = await User.findOne({
            where: {
                id: id_user
            }
        })

        if (response.token != token) {
            return res.status(401).send({ message: 'Unauthorized user' })
        } else {
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
                await Barbershop.update(barbershop, { where: { id: id_barber } })
                return res.status(200).send({ message: 'The barbershop was updated' })
            } catch (error) {
                return res.status(500).send({ message: 'The barbershop cannot be updated' })
            }
        }
    },
    async Delete(req, res) {
        const { id_barber } = req.params
        const token = req.headers.authorization

        const response = await User.findOne({ where: { token: token } })
        if (response.token != token) {
            return res.status(401).send({ message: 'Unauthorized user!' })
        } else {
            try {
                await Barbershop.destroy({ where: { id: id_barber } })
                return res.status(200).send({ message: 'Deleted!' })
            } catch (error) {
                return res.status(500).send({ message: 'Cannot be deleted!' })
            }
        }
    }
}