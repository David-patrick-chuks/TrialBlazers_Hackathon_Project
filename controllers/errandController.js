const errand = require('../models/errand')
const user = require('../models/users')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

exports.createErrand = async (req, res) => {
    try {

        const {title, description,pickupAddress,deliveryAddress,pickupContact,price} = req.body;
        const file = req.file


        if(!title ||  !description || !pickupAddress || !deliveryAddress || !pickupContact || !price ){

            return res.status(404).json({
                message: 'kindly fill the required field'
            })
        }
        const cloudAttachments = await cloudinary.uploader.upload(file.path,{
            folder: 'attachments',
            public_id: `${id}-${Date.now()}`,
            overWrite: true,
        });
       fs.unlinkSync(file.path)

        const Image = {
           publicId: result.public_id,
           url: result.secure_url,
        }
        const newErrand = await errand.create({
            
            title,
            description,
            pickupAddress,
            deliveryAddress,
            pickupContact,
            price,
            attachments : Image
        })

        res.status(200).json({
            message: 'created succefully',
            data: newErrand
        })
    } catch (error) {
        res.status(500).json({
            message: 'internal server error for creating Errand',
            error: error.message
        })
    }
}

exports.getAllErrands = async (req, res) => {
    try {
        const userErrand = await errand.findAll({
            include: [{ model: user, attribute }],
            order: [['createAt', 'DESC']]
        })
        res.status(200).json({
            message: 'all errand ',
            data: userErrand
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server getting all',
            error: error.message
        })
    }
}

exports.getErrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const errand = await errand.findByPK(id, {
            includes: [{
                model: user,
                atributes: ['id', 'fullname', 'email']
            }]
        })
        if (!errand) {
            return res.status(404).json({
                message: 'errand not found'
            })
        }
        res.status(200).json({
            message: 'errand gotten succefully',
            data: errand
        })
    } catch (error) {
        res.status(500).json({
            message: 'internal server error getting errend by id',
            error: error.message
        })
    }
}

exports.updateErrand = async (req, res) => {
    try {

        const {id} = req.params;
        const {assignedTo, status,description,pickupAddress,pickupContact,price} = req.body;

        const errand = await errand.findByPK(id);
        if (!errand) {
            return res.status(404).json({
                message: 'errand not found'
            })
        }

        const update = await errand.update({
            status: status || errand.status,

            assignedTo: assignedTo ||errand.assignedTo,
            price: price ||errand.price,
           
            pickupAddress: pickupAddress|| errand.pickupAddress,
            pickupContact: pickupContact|| errand.pickupContact,
   description: description || errand.description,


        })

        res.status(200).json({
            message: 'Errand updated successfully',
            data: update
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server error ',
            error: error.message
        })
    }
}

exports.deletedErrand = async (req, res) => {
    try {
        const { id } = req.params;
        const errand = await errand.findByPK(id);
        if (!errand) {
            return res.status(404).json({
                message: 'errand with this id is not found'
            })
        }
        const errandDelete = await errand.destroy(errand);
        res.status(200).json({
            message: 'errand deleted successfully',
            data: errandDelete
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server error deleting errand',
            error: error.message
        })
    }
}




