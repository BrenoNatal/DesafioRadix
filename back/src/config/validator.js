const { body } = require("express-validator");

const validationEquipment = (method) =>{
    switch(method){
        case 'create': {
            return [
                body('equipmentId').exists().withMessage("This Field mustn't be null").isLength({min: 8}).withMessage('Por favor, preencha o campo').matches(/^EQ-\d{5}$/).withMessage('Precisa ser no formato EQ-00000'),
            ]
        };
        case 'update': {
            return [
                body('equipmentId').exists().withMessage("This Field mustn't be null").isLength({min: 8}).withMessage('Por favor, preencha o campo').matches(/^EQ-\d{5}$/).withMessage('Precisa ser no formato EQ-00000'),
            ]
        };
    }
}

const validationEvent = (method) =>{
    switch(method){
        case 'create': {
            return [
                body('equipmentId').exists().withMessage("This Field mustn't be null").isLength({min: 8}).withMessage('Por favor, preencha o campo').matches(/^EQ-\d{5}$/).withMessage('Precisa ser no formato EQ-00000'),
            ]
        };
        case 'update': {
            return [
                body('equipmentId').exists().withMessage("This Field mustn't be null").isLength({min: 8}).withMessage('Por favor, preencha o campo').matches(/^EQ-\d{5}$/).withMessage('Precisa ser no formato EQ-00000'),
            ]
        };
    }
}



module.exports = {
    validationEquipment,
    validationEvent
}
