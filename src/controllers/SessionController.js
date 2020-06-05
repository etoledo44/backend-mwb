const Database = require('../helpers/database')
const User = Database('User')
const bcrypt = require('bcrypt')
module.exports = {
    async Login(req, res) {
        const { email, password } = req.body

        async function verifyPassword(psw, hashpsw) {
            try {
                const result = await bcrypt.compare(psw, hashpsw)
                return result
            } catch (error) {
                console.error('compare', error)
            }
        }

        try {
            const response = await User.findOne({ where: { email } })
            if (response.email == email) {
                const pswMatch = await verifyPassword(password, response.password)
                if (pswMatch) {
                    let User = {
                        id_user: response.id,
                        firstName: response.firstName,
                        email: response.email,
                        token: response.token
                    }
                    return res.status(200).send(User)
                } else {
                    return res.status(500).send({ message: 'Email ou senha errado!' })
                }
            } else {
                return res.status(500).send({ message: 'Email ou senha errado!' })
            }
        } catch (error) {
            console.error('error', error)
        }
    }
}