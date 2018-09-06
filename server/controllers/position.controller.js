const Position = require('../models/Position.model');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async (req, res) => {
    try {
        const  positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });
        res.status(200).json(positions);

    } catch (e) {
        errorHandler(e);
    }
    res.status(200).json({
        register: 'Position from controller'
    })
};

module.exports.remove = async (req, res) => {
   try {
       await Position.remove({
           _id: req.params.id
       });
       res.status(200).json({
           message: 'Позиция была удалена'
       });

   } catch (e) {
       errorHandler(e);
   }
};

module.exports.create = async (req, res) => {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save();
        res.status(201).json(position);

    } catch (e) {
        errorHandler(e);
    }
};
module.exports.update = async (req, res) => {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            );
        res.status(200).json(position);

    } catch (e) {
        errorHandler(e);
    }
};
