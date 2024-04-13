const { Router } = require('express');
const EventController = require('../controllers/EventController');
const EquipmentController = require('../controllers/EquipmentController');
const validator = require("../config/validator");

const router = Router();

//Rotas evento
router.get('/event/:days', EventController.index);
router.post('/event', EventController.create);
router.post('/eventCSV', EventController.createCsv);

//Rotas equipamento
router.post('/equipment',validator.validationEquipment('create') , EquipmentController.create);
router.post('/equipmentCsv' , EquipmentController.createCsv);


module.exports = router;