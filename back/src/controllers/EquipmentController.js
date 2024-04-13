const { response } = require('express');
const { Op } = require("sequelize");
const Equipement = require("../models/Equipment");
const { validationResult } = require('express-validator');
const fs = require('fs')
const csv = require("csvtojson");

/*
Cria um equipamento validando se o ID é valido
*/
const create = async (req, res) => {
    try {
        validationResult(req).throw();
        const newEquipement = {
            equipmentId: req.body.equipmentId,
        };
    
        const equipement = await Equipement.create(newEquipement);
        return res.status(201).json({ message: "Event adicionado com sucesso", equipement: equipement });
    } catch (error) {
        res.status(500).json({ error });
    }
};
/*
Cria os equipamento a partir de um arquivo csv
*/
const createCsv = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            throw new Error('Arquivo não encontrado');
        } else if (req.files.file.mimetype === 'text/csv') {
            let csvFile = req.files.file.tempFilePath;
    
            const jsonArray = await csv().fromFile(csvFile);

            const equipements = []

            for (const obj of jsonArray) {
                
                const newEquipement = {
                    equipmentId: obj.equipmentId,
                };
                
                const equipement = await Equipement.create(newEquipement);
                equipements.push(equipement)

            };
    
            return res.status(200).json({message: 'Equipmentos adicionados com sucesso', equipements});

        } else {
            throw new Error('Formato de arquivo errado');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    create,
    createCsv,
}