const { response } = require('express');
const { Sequelize, Op, where } = require("sequelize");
const Event = require("../models/Event");
const fs = require('fs')
const csv = require("csvtojson");



/*
Pegar os eventos que ocorreram nos ultimos x dias
Recebe days no parametro e calculo o tempo
*/
const index = async (req, res) => {
    const { days } = req.params;
    try {

        if (!(days > 0)){
            throw new Error('Necessario a quantidade de dias')
        }

        const dateThreshold = new Date(new Date() - days * 24 * 60 * 60 * 1000);

        const event = await Event.findAll({
            attributes: ['equipmentId', [Sequelize.fn('AVG', Sequelize.col('value')), 'average_value']],
            group: ['equipmentId'],
            where: {
                timestamp: {
                    [Op.gte]: dateThreshold
                }
            },
        });


        return res.status(200).json({ event })
    } catch (error) {
        return res.status(500).json({ error })
    }
};

const create = async (req, res) => {
    try {
        const newEvent = {
            timestamp: req.body.timestamp,
            value: req.body.value,
            equipmentId: req.body.equipmentId,
        };

        const event = await Event.create(newEvent);
        return res.status(201).json({ message: "Event adicionado com sucesso", event: event });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createCsv = async (req, res) => {
    
    try {
        if (!req.files || !req.files.file) {
            throw new Error('Arquivo não encontrado');
        } else if (req.files.file.mimetype === 'text/csv') {
            let csvFile = req.files.file.tempFilePath;
    
            const jsonArray = await csv().fromFile(csvFile);

            const events = []

            for (const obj of jsonArray) {
                
                const newEvent = {
                    timestamp: obj.timestamp,
                    value: obj.value,
                    equipmentId: obj.equipmentId,
                };

                const event = await Event.create(newEvent);
                events.push(event)

            };
    
            return res.status(200).json({message: 'Events adicionados com sucesso', events});

        } else {
            throw new Error('Formato de arquivo errado');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    index,
    create,
    createCsv,
}


