const {Router} = require('express')
const routes = Router()
const UserController = require('./controllers/UserController')
const BarberShopController = require('./controllers/BarberShopController')


routes.post('/user/create', UserController.Store)
routes.get('/user/show', UserController.Show)

routes.post('/barber/create', BarberShopController.Store)
routes.post('/barber/update/:id_barber', BarberShopController.Update)
routes.post('/barber/delete/:id_barber', BarberShopController.Delete)
routes.get('/barber/show', BarberShopController.Show)
routes.get('/barber/show/:id_barber', BarberShopController.ShowOne)


module.exports = routes