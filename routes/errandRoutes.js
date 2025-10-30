const express = require('express');
const router = express.Router();
const { createErrand, getAllErrands, getErrandById, updateErrand, deleteErrand } = require('../controllers/errandController');
const { postErrandValidator } = require('../middleware/validator');
const { authenticated } = require('../middleware/authenticate');
const uploads = require('../middleware/multer'); // multer config for file uploads

/**
 * @swagger
 * /api/errand/create:
 *   post:
 *     summary: Create a new errand
 *     tags: [Errands]
 *     description: Allows an authenticated user to create a new errand request. Supports file upload for attachments.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - pickupAddress
 *               - deliveryAddress
 *               - pickupContact
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Deliver documents to the office"
 *               description:
 *                 type: string
 *                 example: "Pick up files from my house and deliver them to the company"
 *               pickupAddress:
 *                 type: string
 *                 example: "Lekki Phase 1, Lagos"
 *               deliveryAddress:
 *                 type: string
 *                 example: "Victoria Island, Lagos"
 *               pickupContact:
 *                 type: string
 *                 example: "08012345678"
 *               price:
 *                 type: number
 *                 example: 2500
 *               attachments:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Errand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Errand created successfully"
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing or invalid data
 *       500:
 *         description: Server error while creating errand
 */
router.post('/create', authenticated, uploads.single('attachments'), postErrandValidator, createErrand);


/**
 * @swagger
 * /api/errand/getall:
 *   get:
 *     summary: Retrieve all errands
 *     tags: [Errands]
 *     description: Fetches a list of all errands created by users.
 *     responses:
 *       200:
 *         description: List of all errands retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All errands retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "e3f9d7e0-82c6-4a7f-94d5-0b44f9c85f21"
 *                       userId:
 *                         type: string
 *                         example: "a9c3b5d7-ef2a-43de-9104-1d8c7f1b7e55"
 *                       title:
 *                         type: string
 *                         example: "Deliver groceries"
 *                       pickupAddress:
 *                         type: string
 *                         example: "Yaba, Lagos"
 *                       deliveryAddress:
 *                         type: string
 *                         example: "Ikeja, Lagos"
 *                       pickupContact:
 *                         type: string
 *                         example: "08123456789"
 *                       price:
 *                         type: number
 *                         example: 3500
 *                       status:
 *                         type: string
 *                         example: "Open"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-24T10:15:30Z"
 *       404:
 *         description: No errands found
 *       500:
 *         description: Internal server error
 */
router.get('/getall', getAllErrands);


/**
 * @swagger
 * /api/errand/get/{id}:
 *   get:
 *     summary: Get an errand by ID
 *     tags: [Errands]
 *     description: Retrieve details of a specific errand by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the errand to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Errand retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Errand retrieved successfully"
 *                 data:
 *                   type: object
 *       404:
 *         description: Errand not found
 *       500:
 *         description: Server error while retrieving errand
 */
router.get('/get/:id', getErrandById);


/**
 * @swagger
 * /api/errand/update/{id}:
 *   put:
 *     summary: Update an existing errand
 *     tags: [Errands]
 *     description: Update an errand’s details using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the errand to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 format: uuid
 *                 example: "a4c5d2f3-b9e0-4e78-9c9a-7c2f6e3d9b10"
 *               status:
 *                 type: string
 *                 enum: [Open, Assigned, Completed, Cancelled]
 *                 example: "Assigned"
 *               pickupAddress:
 *                 type: string
 *                 example: "Lekki, Lagos"
 *               pickupContact:
 *                 type: string
 *                 example: "08098765432"
 *               description:
 *                 type: string
 *                 example: "Deliver updated package instead"
 *               price:
 *                 type: number
 *                 example: 3000
 *     responses:
 *       200:
 *         description: Errand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Errand updated successfully"
 *                 data:
 *                   type: object
 *       404:
 *         description: Errand not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', updateErrand);


/**
 * @swagger
 * /api/errand/delete/{id}:
 *   delete:
 *     summary: Delete an errand by ID
 *     tags: [Errands]
 *     description: Permanently remove an errand from the system by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the errand to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Errand deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Errand deleted successfully"
 *       404:
 *         description: Errand not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', deleteErrand);

module.exports = router;
