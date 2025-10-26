const {
    verifyUserBVN,
    verifyUserNIN,
    getUserKYCStatus,
    getKYCByIdController,
    updateKYCStatusController,
    getAllKYCRecordsController,
    validateBVNFormat,
    validateNINFormat
} = require('../controllers/kycController');

const router = require('express').Router();


/**
 * @swagger
 * /api/v1/kyc/verify/bvn:
 *   post:
 *     summary: Verify user with BVN
 *     description: Initiates BVN (Bank Verification Number) verification for user identity validation.
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bvn
 *             properties:
 *               bvn:
 *                 type: string
 *                 pattern: '^[0-9]{11}$'
 *                 description: 11-digit Bank Verification Number
 *                 example: "12345678901"
 *               nepaBillUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to NEPA bill for address verification
 *                 example: "https://example.com/nepa-bill.pdf"
 *               validation:
 *                 type: object
 *                 description: Additional validation data
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *     responses:
 *       201:
 *         description: BVN verification initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "BVN verification completed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     kycId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     verificationType:
 *                       type: string
 *                       example: "BVN"
 *                     verificationId:
 *                       type: string
 *                       example: "12345678901"
 *                     status:
 *                       type: string
 *                       enum: [pending, approved, rejected, verified]
 *                       example: "pending"
 *                     verificationReference:
 *                       type: string
 *                       example: "BVN_VER_20241201_001"
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         dateOfBirth:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01"
 *                         phoneNumber:
 *                           type: string
 *                           example: "+2348012345678"
 *       400:
 *         description: Bad request - Invalid BVN or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid BVN format or BVN already verified"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post('/verify/bvn', verifyUserBVN);

/**
 * @swagger
 * /api/v1/kyc/verify/nin:
 *   post:
 *     summary: Verify user with NIN
 *     description: Initiates NIN (National Identification Number) verification for user identity validation.
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nin
 *             properties:
 *               nin:
 *                 type: string
 *                 pattern: '^[0-9]{11}$'
 *                 description: 11-digit National Identification Number
 *                 example: "12345678901"
 *               nepaBillUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to NEPA bill for address verification
 *                 example: "https://example.com/nepa-bill.pdf"
 *               validation:
 *                 type: object
 *                 description: Additional validation data
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *     responses:
 *       201:
 *         description: NIN verification initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "NIN verification completed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     kycId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     verificationType:
 *                       type: string
 *                       example: "NIN"
 *                     verificationId:
 *                       type: string
 *                       example: "12345678901"
 *                     status:
 *                       type: string
 *                       enum: [pending, approved, rejected, verified]
 *                       example: "pending"
 *                     verificationReference:
 *                       type: string
 *                       example: "NIN_VER_20241201_001"
 *                     userDetails:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         middleName:
 *                           type: string
 *                           example: "Michael"
 *                         dateOfBirth:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01"
 *                         gender:
 *                           type: string
 *                           example: "Male"
 *                         address:
 *                           type: object
 *                           properties:
 *                             state:
 *                               type: string
 *                               example: "Lagos"
 *                             lga:
 *                               type: string
 *                               example: "Ikeja"
 *       400:
 *         description: Bad request - Invalid NIN or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid NIN format or NIN already verified"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post('/verify/nin', verifyUserNIN);

/**
 * @swagger
 * /api/v1/kyc/status:
 *   get:
 *     summary: Get user KYC status
 *     description: Retrieves the current KYC verification status for the authenticated user.
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KYC status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "KYC status retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     overallStatus:
 *                       type: string
 *                       enum: [not_verified, pending, verified, rejected]
 *                       example: "verified"
 *                     verificationLevel:
 *                       type: string
 *                       enum: [none, basic, advanced, full]
 *                       example: "full"
 *                     kycRecords:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           verificationType:
 *                             type: string
 *                             enum: [BVN, NIN]
 *                             example: "BVN"
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, rejected, verified]
 *                             example: "verified"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-01T10:30:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-01T11:00:00Z"
 *                     requirements:
 *                       type: object
 *                       properties:
 *                         bvnRequired:
 *                           type: boolean
 *                           example: true
 *                         ninRequired:
 *                           type: boolean
 *                           example: true
 *                         nepaBillRequired:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 */
router.get('/status', getUserKYCStatus);

/**
 * @swagger
 * /api/v1/kyc/records/{kycId}:
 *   get:
 *     summary: Get KYC record by ID
 *     description: Retrieves detailed information about a specific KYC verification record.
 *     tags: [KYC]
 *     parameters:
 *       - in: path
 *         name: kycId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: KYC record ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: KYC record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "KYC record retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     verificationType:
 *                       type: string
 *                       enum: [BVN, NIN]
 *                       example: "BVN"
 *                     verificationId:
 *                       type: string
 *                       example: "12345678901"
 *                     status:
 *                       type: string
 *                       enum: [pending, approved, rejected, verified]
 *                       example: "verified"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     middleName:
 *                       type: string
 *                       example: "Michael"
 *                     dateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+2348012345678"
 *                     gender:
 *                       type: string
 *                       example: "Male"
 *                     address:
 *                       type: object
 *                       properties:
 *                         state:
 *                           type: string
 *                           example: "Lagos"
 *                         lga:
 *                           type: string
 *                           example: "Ikeja"
 *                         street:
 *                           type: string
 *                           example: "123 Main Street"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/user-photo.jpg"
 *                     nepaBillUrl:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/nepa-bill.pdf"
 *                     validationResults:
 *                       type: object
 *                       properties:
 *                         isVerified:
 *                           type: boolean
 *                           example: true
 *                         confidence:
 *                           type: number
 *                           example: 0.95
 *                         matchedFields:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["firstName", "lastName", "dateOfBirth"]
 *                     verificationReference:
 *                       type: string
 *                       example: "BVN_VER_20241201_001"
 *                     rejectionReason:
 *                       type: string
 *                       example: null
 *                     reviewedBy:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T10:30:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T11:00:00Z"
 *       400:
 *         description: Bad request - Invalid KYC ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid KYC record ID"
 *       404:
 *         description: KYC record not found
 */
router.get('/records/:kycId', getKYCByIdController);

/**
 * @swagger
 * /api/v1/kyc/records:
 *   get:
 *     summary: Get all KYC records
 *     description: Retrieves all KYC verification records with optional filtering (Admin endpoint).
 *     tags: [KYC]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, verified]
 *         description: Filter by KYC status
 *         example: "pending"
 *       - in: query
 *         name: verificationType
 *         schema:
 *           type: string
 *           enum: [BVN, NIN]
 *         description: Filter by verification type
 *         example: "BVN"
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *         example: "2024-11-01"
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *         example: "2024-12-01"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of records to return
 *         example: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of records to skip
 *         example: 0
 *     responses:
 *       200:
 *         description: KYC records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "KYC records retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           userId:
 *                             type: string
 *                             format: uuid
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           verificationType:
 *                             type: string
 *                             enum: [BVN, NIN]
 *                             example: "BVN"
 *                           verificationId:
 *                             type: string
 *                             example: "12345678901"
 *                           status:
 *                             type: string
 *                             enum: [pending, approved, rejected, verified]
 *                             example: "pending"
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           lastName:
 *                             type: string
 *                             example: "Doe"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-01T10:30:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-01T11:00:00Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 150
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         offset:
 *                           type: integer
 *                           example: 0
 *                         hasMore:
 *                           type: boolean
 *                           example: true
 *                     summary:
 *                       type: object
 *                       properties:
 *                         totalRecords:
 *                           type: integer
 *                           example: 150
 *                         pendingCount:
 *                           type: integer
 *                           example: 25
 *                         verifiedCount:
 *                           type: integer
 *                           example: 100
 *                         rejectedCount:
 *                           type: integer
 *                           example: 25
 *       400:
 *         description: Bad request - Invalid query parameters
 */
router.get('/records', getAllKYCRecordsController);

/**
 * @swagger
 * /api/v1/kyc/records/{kycId}/status:
 *   put:
 *     summary: Update KYC status
 *     description: Updates the status of a KYC verification record (Admin only).
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kycId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: KYC record ID
 *         example: "123e4567-e89b-12d3-a456-426614174000"
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
 *                 enum: [approved, rejected, verified]
 *                 description: New status for the KYC record
 *                 example: "approved"
 *               rejectionReason:
 *                 type: string
 *                 description: Reason for rejection (required if status is rejected)
 *                 example: "Document quality is poor"
 *     responses:
 *       200:
 *         description: KYC status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "KYC status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     status:
 *                       type: string
 *                       enum: [approved, rejected, verified]
 *                       example: "approved"
 *                     rejectionReason:
 *                       type: string
 *                       example: null
 *                     reviewedBy:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T11:00:00Z"
 *       400:
 *         description: Bad request - Invalid status or missing rejection reason
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Rejection reason is required when status is rejected"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: KYC record not found
 */
router.put('/records/:kycId/status', updateKYCStatusController);

/**
 * @swagger
 * /api/v1/kyc/validate/bvn:
 *   post:
 *     summary: Validate BVN format
 *     description: Validates the format of a Bank Verification Number without performing full verification.
 *     tags: [KYC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bvn
 *             properties:
 *               bvn:
 *                 type: string
 *                 description: Bank Verification Number to validate
 *                 example: "12345678901"
 *     responses:
 *       200:
 *         description: BVN validation completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "BVN validation completed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bvn:
 *                       type: string
 *                       example: "12345678901"
 *                     isValid:
 *                       type: boolean
 *                       example: true
 *                     format:
 *                       type: string
 *                       example: "Valid 11-digit BVN format"
 *                     checksum:
 *                       type: boolean
 *                       example: true
 *                     description:
 *                       type: string
 *                       example: "BVN format is valid and ready for verification"
 *       400:
 *         description: Bad request - BVN is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "BVN is required"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bvn:
 *                       type: string
 *                       example: ""
 *                     isValid:
 *                       type: boolean
 *                       example: false
 *                     format:
 *                       type: string
 *                       example: "Invalid BVN format"
 */
router.post('/validate/bvn', validateBVNFormat);

/**
 * @swagger
 * /api/v1/kyc/validate/nin:
 *   post:
 *     summary: Validate NIN format
 *     description: Validates the format of a National Identification Number without performing full verification.
 *     tags: [KYC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nin
 *             properties:
 *               nin:
 *                 type: string
 *                 description: National Identification Number to validate
 *                 example: "12345678901"
 *     responses:
 *       200:
 *         description: NIN validation completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "NIN validation completed"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nin:
 *                       type: string
 *                       example: "12345678901"
 *                     isValid:
 *                       type: boolean
 *                       example: true
 *                     format:
 *                       type: string
 *                       example: "Valid 11-digit NIN format"
 *                     checksum:
 *                       type: boolean
 *                       example: true
 *                     description:
 *                       type: string
 *                       example: "NIN format is valid and ready for verification"
 *       400:
 *         description: Bad request - NIN is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "NIN is required"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nin:
 *                       type: string
 *                       example: ""
 *                     isValid:
 *                       type: boolean
 *                       example: false
 *                     format:
 *                       type: string
 *                       example: "Invalid NIN format"
 */
router.post('/validate/nin', validateNINFormat);

module.exports = router;
