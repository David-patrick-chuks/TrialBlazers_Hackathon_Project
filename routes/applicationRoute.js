const router = require('express').Router();
const { applyForErrand, getErrandApplications, updateApplicationStatus, getRunnerApplications } = require('../controllers/applicationController');
const { authenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * /api/v1/applications/apply:
 *   post:
 *     summary: Runner applies for an errand
 *     description: Allows a verified runner to apply for a specific errand by providing a bid price and message.
 *     tags: [Runner Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - errandId
 *               - bidPrice
 *             properties:
 *               errandId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the errand the runner wants to apply for.
 *                 example: "2c1a2d0e-4410-4e23-8c60-d6b7e21e2f31"
 *               bidPrice:
 *                 type: number
 *                 format: float
 *                 description: The amount the runner is bidding for the errand.
 *                 example: 1500
 *               message:
 *                 type: string
 *                 description: Optional message to the client explaining the application or offer.
 *                 example: "I live nearby and can get this done within 2 hours."
 *     responses:
 *       201:
 *         description: Application successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application submitted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "32c9f480-16e1-41c4-a24b-42b7312f7469"
 *                     runnerId:
 *                       type: string
 *                       format: uuid
 *                       example: "b47e8610-3e64-4b28-9cf3-cd7e3b2a8472"
 *                     errandId:
 *                       type: string
 *                       format: uuid
 *                       example: "2c1a2d0e-4410-4e23-8c60-d6b7e21e2f31"
 *                     bidPrice:
 *                       type: number
 *                       example: 1500
 *                     status:
 *                       type: string
 *                       example: Pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-24T11:20:00.000Z"
 *       400:
 *         description: Bad Request — missing fields or duplicate application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You already applied for this errand
 *       404:
 *         description: Errand not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Errand not found
 *       500:
 *         description: Internal server error.
 */
router.post('/apply', authenticated, applyForErrand);

/**
 * @swagger
 * /api/v1/applications/errand/{errandId}:
 *   get:
 *     summary: Get all applications for a specific errand
 *     description: Fetch all runner applications submitted for a particular errand, including the runners’ basic details.
 *     tags: [Runner Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: errandId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the errand
 *         example: "2c1a2d0e-4410-4e23-8c60-d6b7e21e2f31"
 *     responses:
 *       200:
 *         description: A list of all applications for the given errand.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Found 3 applications for this errand"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "54a3bb40-8e16-421a-9c6f-9b6dff97b0e9"
 *                       runnerId:
 *                         type: string
 *                         format: uuid
 *                         example: "b47e8610-3e64-4b28-9cf3-cd7e3b2a8472"
 *                       errandId:
 *                         type: string
 *                         format: uuid
 *                         example: "2c1a2d0e-4410-4e23-8c60-d6b7e21e2f31"
 *                       bidPrice:
 *                         type: number
 *                         example: 1500
 *                       message:
 *                         type: string
 *                         example: "I live nearby and can complete this within 2 hours."
 *                       status:
 *                         type: string
 *                         example: Pending
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-24T11:20:00.000Z"
 *                       runner:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: "James"
 *                           lastName:
 *                             type: string
 *                             example: "Olu"
 *                           email:
 *                             type: string
 *                             example: "jamesolu@gmail.com"
 *       404:
 *         description: Errand not found or no applications submitted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No applications found for this errand"
 */
router.get('/errand/:errandId', authenticated, getErrandApplications);

/**
 * @swagger
 * /api/v1/applications/{id}/status:
 *   put:
 *     summary: Update the status of a runner’s errand application
 *     description: Allows the errand creator (or admin) to accept or reject a runner’s application.
 *     tags: [Runner Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the application to update
 *         example: "b48a2c13-2b64-4b5b-a624-cc87c44210f5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Accepted, Rejected]
 *                 example: "Accepted"
 *     responses:
 *       200:
 *         description: Application status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application accepted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "b48a2c13-2b64-4b5b-a624-cc87c44210f5"
 *                     runnerId:
 *                       type: string
 *                       example: "dfc9a890-76bc-4c61-b2c1-b8828ec6ad03"
 *                     errandId:
 *                       type: string
 *                       example: "e1f8923c-0f4e-4b20-bd7e-57a40b49b92f"
 *                     status:
 *                       type: string
 *                       example: "Accepted"
 *                     bidPrice:
 *                       type: number
 *                       example: 2500
 *                     message:
 *                       type: string
 *                       example: "I can start immediately."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-24T09:15:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-24T10:00:00.000Z"
 *       400:
 *         description: Invalid status or bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid status"
 *       404:
 *         description: Application not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application not found"
 */
router.put('/:id/status', authenticated, updateApplicationStatus);

/**
 * @swagger
 * /api/v1/applications/my-applications:
 *   get:
 *     summary: Get all errands applied for by the authenticated runner
 *     description: Returns a list of all errand applications submitted by the currently logged-in runner.
 *     tags: [Runner Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Applications fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fetched runner applications successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "a7b43e7d-4c2d-4571-90c5-4c2db35c4423"
 *                       runnerId:
 *                         type: string
 *                         example: "e37b0a0b-3c16-47d0-9232-f8fba045d94a"
 *                       errandId:
 *                         type: string
 *                         example: "da8d5f12-56d7-4c23-b96f-3a3f812cf2bb"
 *                       bidPrice:
 *                         type: number
 *                         example: 5000
 *                       message:
 *                         type: string
 *                         example: "I can complete this errand within 2 hours."
 *                       status:
 *                         type: string
 *                         enum: [Pending, Accepted, Rejected]
 *                         example: "Pending"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-24T09:30:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-24T10:00:00.000Z"
 *                       errand:
 *                         type: object
 *                         description: The errand details associated with this application.
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "da8d5f12-56d7-4c23-b96f-3a3f812cf2bb"
 *                           title:
 *                             type: string
 *                             example: "Deliver package to Lagos Island"
 *                           description:
 *                             type: string
 *                             example: "Pick up a parcel in Ikeja and deliver it to Lagos Island within 3 hours."
 *                           budget:
 *                             type: number
 *                             example: 10000
 *                           location:
 *                             type: string
 *                             example: "Ikeja, Lagos"
 *       401:
 *         description: Unauthorized - missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Please provide a valid token."
 */
router.get('/my-applications', authenticated, getRunnerApplications);


module.exports = router;
