const {
    verifyBVN,
    verifyNIN,
    getKYCStatus,
    getKYCById,
    updateKYCStatus,
    getAllKYCRecords,
    isValidBVN,
    isValidNIN
} = require('../services/kyc');

const verifyUserBVN = async (req, res) => {
    try {
        const { bvn, nepaBillUrl, validation } = req.body;
        const userId = req.user.id;

        const bvnData = {
            userId,
            bvn,
            nepaBillUrl,
            validation
        };

        const result = await verifyBVN(bvnData);

        res.status(201).json({
            success: true,
            message: 'BVN verification completed successfully',
            data: result
        });

    } catch (error) {
        console.error('Error verifying BVN:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const verifyUserNIN = async (req, res) => {
    try {
        const { nin, nepaBillUrl, validation } = req.body;
        const userId = req.user.id;

        const ninData = {
            userId,
            nin,
            nepaBillUrl,
            validation
        };

        const result = await verifyNIN(ninData);

        res.status(201).json({
            success: true,
            message: 'NIN verification completed successfully',
            data: result
        });

    } catch (error) {
        console.error('Error verifying NIN:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getUserKYCStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await getKYCStatus(userId);

        res.status(200).json({
            success: true,
            message: 'KYC status retrieved successfully',
            data: result
        });

    } catch (error) {
        console.error('Error getting KYC status:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getKYCByIdController = async (req, res) => {
    try {
        const { kycId } = req.params;

        const result = await getKYCById(kycId);

        res.status(200).json({
            success: true,
            message: 'KYC record retrieved successfully',
            data: result
        });

    } catch (error) {
        console.error('Error getting KYC by ID:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateKYCStatusController = async (req, res) => {
    try {
        const { kycId } = req.params;
        const { status, rejectionReason } = req.body;
        const reviewedBy = req.user.id;

        const result = await updateKYCStatus(kycId, status, rejectionReason, reviewedBy);

        res.status(200).json({
            success: true,
            message: 'KYC status updated successfully',
            data: result
        });

    } catch (error) {
        console.error('Error updating KYC status:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllKYCRecordsController = async (req, res) => {
    try {
        const { 
            status, 
            verificationType, 
            dateFrom, 
            dateTo, 
            limit, 
            offset 
        } = req.query;

        const filters = {};
        if (status) filters.status = status;
        if (verificationType) filters.verificationType = verificationType;
        if (dateFrom) filters.dateFrom = dateFrom;
        if (dateTo) filters.dateTo = dateTo;
        if (limit) filters.limit = parseInt(limit);
        if (offset) filters.offset = parseInt(offset);

        const result = await getAllKYCRecords(filters);

        res.status(200).json({
            success: true,
            message: 'KYC records retrieved successfully',
            data: result
        });

    } catch (error) {
        console.error('Error getting all KYC records:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const validateBVNFormat = async (req, res) => {
    try {
        const { bvn } = req.body;

        if (!bvn) {
            return res.status(400).json({
                success: false,
                message: 'BVN is required'
            });
        }

        const isValid = isValidBVN(bvn);

        res.status(200).json({
            success: true,
            message: 'BVN validation completed',
            data: {
                bvn,
                isValid,
                format: isValid ? 'Valid 11-digit BVN format' : 'Invalid BVN format'
            }
        });

    } catch (error) {
        console.error('Error validating BVN format:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const validateNINFormat = async (req, res) => {
    try {
        const { nin } = req.body;

        if (!nin) {
            return res.status(400).json({
                success: false,
                message: 'NIN is required'
            });
        }

        const isValid = isValidNIN(nin);

        res.status(200).json({
            success: true,
            message: 'NIN validation completed',
            data: {
                nin,
                isValid,
                format: isValid ? 'Valid 11-digit NIN format' : 'Invalid NIN format'
            }
        });

    } catch (error) {
        console.error('Error validating NIN format:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    verifyUserBVN,
    verifyUserNIN,
    getUserKYCStatus,
    getKYCByIdController,
    updateKYCStatusController,
    getAllKYCRecordsController,
    validateBVNFormat,
    validateNINFormat
};
