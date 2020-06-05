const database = require('../helpers/database')
const User = database('User')
const Barbershop = database('Barbershop')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

module.exports = {
    async Store(req, res) {
        const { firstName, lastName, email, password } = req.body
        const salt = 10

        const checkEmail = await User.findOne({ where: { email } })

        if (checkEmail) {
            return res.send({ message: 'User already exist!' })
        } else {
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
                await User.create(user)
                return res.status(200).send({ message: 'Created!' })

            } catch (error) {
                return res.status(500).send({ message: 'Error to encrypt' })
            }
        }
    },
    async Show(req, res) {
        const { id } = req.body
        const token = req.headers.authorization

        const user = await User.findOne({ where: { id } })
        if (user.token != token) {
            return res.status(400).send({ message: 'Unauthorized user!' })
        } else {
            try {
                const response = await User.findAll({
                    where: {
                        id
                    },
                    include: [
                        {
                            model: Barbershop,
                            as: 'Barbershops'
                        }
                    ]
                })
                return res.json(response)
            } catch (error) {
                console.log('exibir barbearias')
            }
        }
    },

    async Delete(req, res) {
        const { id } = req.body
        const token = req.headers.authorization

        async function isUserValid(id) {
            let user = await User.findOne({ where: { id } })
            if (user.token != token) {
                return false
            } else {
                return true
            }
        }

        const responseValidUser = await isUserValid(id)
        if (responseValidUser) {
            try {
                await User.destroy({ where: { id } })
                return res.status(200).send({ message: 'Deleted' })
            } catch (error) {
                return res.status(500).send({ message: 'User are not deleted' })
            }
        } else {
            return res.status(500).send({ message: 'Unauthorized user!' })
        }
    }
}
