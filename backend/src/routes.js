const express = require('express');

const DisciplineController = require('./controllers/DisciplineController');
const StudentController = require('./controllers/StudentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/disciplines', DisciplineController.index);
routes.post('/disciplines', DisciplineController.create);
routes.delete('/disciplines/:id', DisciplineController.delete);

routes.get('/profile', ProfileController.index);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.create);
routes.delete('/students/:id', StudentController.delete)

module.exports = routes;