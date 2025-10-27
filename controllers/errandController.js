const { ECDH } = require('crypto');
const errand = require('../models/errand')
const user = require('../models/users')

const {uuiv4} = require('uuid')

exports.createErrand = async (req,res) => {
    try {
        const {userId,title,category, recieverNo, instruction,description,location,price} = req.body;

        if(!userId || !title || !category || !recieverNo ||  !instruction || !description || !location || !price ){
            return res.status(404).json({
                message: 'missing field is required'
            })
        }
        const newErrand = await errand.create({
            Id:uuiv4(),
            userId,
            title,
            category,
            recieverNo,
            instruction,
            description,
            location,
            price
        })

        res.status(200).json({
            message:'created succefully',
            data:newErrand
        })
    } catch (error) {
        res.status(500).json({
            message:'internal server error for creating Errand',
            error:error.message
        })
    }
}

exports.getAllErrands = async (req,res) => {
    try {
        const userErrand = await errand.findAll({
            include:[{model:user, attribute }],
            order:[['createAt', 'DESC']]
        })
        res.status(200).json({
            message:'all errand ',
            data: userErrand
        })
        
    } catch (error) {
        res.status(500).json({
            message:'internal server getting all',
            error:error.message
        })
    }
}

exports.getErrandById = async (req,res) => {
    try {
        const {id} = req.params;
        const errand = await errand.findByPK(id, {
            includes: [{model:user,
                atributes:['id', 'fullname', 'email']
            }]
        })
        if(!errand) {
            return res.status(404).json({
                message:'errand not found'
            })
        }
        res.status(200).json({
            message:'errand gotten succefully',
            data: errand
        })
    } catch (error) {
        res.status(500).json({
            message:'internal server error getting errend by id',
            error:error.message
        })
    }
}

exports.updateErrand = async (req,res) => {
    try {
        const {id} = req.params;
        const {assignedTo, status,description,location,price} = req.body;

        const errand = await errand.findByPK(id);
        if (!errand){
            return res.status(404).json({
                message:'errand not found'
            })
        }

        const update = await errand.update({
            status: status || errand.status,
            assignedTo: assignedTo ||errand.assignedTo,
            price: price ||errand.price,
            location: location || errand.location,
            description: description || errand.description,


        })

        res.status(200).json({
            message:'Errand updated successfully',
            data:update
        })
        
    } catch (error) {
        res.status(500).json({
            message:'internal server error ',
            error:error.message
        })
    }
}

exports.deletedErrand = async (req,res) => {
    try {
        const {id} = req.params;
        const errand = await errand.findByPK(id);
        if(!errand){
            return res.status(404).json({
                message:'errand with this id is not found'
            })
        }
        const errandDelete = await errand.destroy(errand);
        res.status(200).json({
            message:'errand deleted successfully',
            data:errandDelete
        })
        
    } catch (error) {
        res.status(500).json({
            message:'internal server error deleting errand',
            error:error.message
        })
    }
}



