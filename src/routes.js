const { Router } = require('express')
const routes = Router()
const UserController = require('./controllers/UserController')
const BarberShopController = require('./controllers/BarberShopController')
const ViewBarberController = require('./controllers/ViewBarberController')
const SessionController = require('./controllers/SessionController')

//rotas de comando do usuário
routes.post('/user/create', UserController.Store)
routes.get('/user/show', UserController.Show)
routes.delete('/user/delete', UserController.Delete)

//Rotas de comando da barbearia
routes.post('user/barbershop/create', BarberShopController.Store)
routes.post('user/barbershop/update/:id_barber', BarberShopController.Update)
routes.post('user/barbershop/delete/:id_barber', BarberShopController.Delete)
routes.get('user/barbershop/show', BarberShopController.Show)
routes.get('user/barbershop/show/:id_barber', BarberShopController.ShowOne)

//Rotas de exibições
routes.get('/', ViewBarberController.ShowBarbershops)
routes.get('/barbers', ViewBarberController.ShowBarber)

//Rota de sessão
routes.post('/login', SessionController.Login)

module.exports = routes