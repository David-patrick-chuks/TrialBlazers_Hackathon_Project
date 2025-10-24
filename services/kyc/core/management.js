const KYC = require('../../../models/kyc');
const User = require('../../../models/users');

const getKYCStatus = async (userId) => {
    try {
        const kycRecords = await KYC.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        });
        
        if (kycRecords.length === 0) {
            return {
                success: true,
                userId: userId,
                kycStatus: 'not_verified',
                records: [],
                message: 'No KYC records found'
            };
        }
        
        const formattedRecords = kycRecords.map(record => ({
            id: record.id,
            verificationType: record.verificationType,
            verificationId: record.verificationId,
            firstName: record.firstName,
            lastName: record.lastName,
            status: record.status,
            verificationReference: record.verificationReference,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }));
        
        const hasVerifiedRecord = kycRecords.some(record => record.status === 'verified');
        const kycStatus = hasVerifiedRecord ? 'verified' : 'pending';
        
        return {
            success: true,
            userId: userId,
            kycStatus: kycStatus,
            records: formattedRecords,
            totalRecords: kycRecords.length,
            message: `Retrieved ${kycRecords.length} KYC records`
        };
        
    } catch (error) {
        console.error('Error getting KYC status:', error);
        throw new Error(`Failed to get KYC status: ${error.message}`);
    }
};

const getKYCById = async (kycId) => {
    try {
        const kycRecord = await KYC.findOne({
            where: { id: kycId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber']
            }]
        });
        
        if (!kycRecord) {
            throw new Error(`KYC record not found: ${kycId}`);
        }
        
        return {
            success: true,
            kyc: {
                id: kycRecord.id,
                userId: kycRecord.userId,
                verificationType: kycRecord.verificationType,
                verificationId: kycRecord.verificationId,
                firstName: kycRecord.firstName,
                lastName: kycRecord.lastName,
                middleName: kycRecord.middleName,
                dateOfBirth: kycRecord.dateOfBirth,
                phoneNumber: kycRecord.phoneNumber,
                gender: kycRecord.gender,
                address: kycRecord.address,
                image: kycRecord.image,
                nepaBillUrl: kycRecord.nepaBillUrl,
                validationResults: kycRecord.validationResults,
                verificationReference: kycRecord.verificationReference,
                status: kycRecord.status,
                rejectionReason: kycRecord.rejectionReason,
                reviewedBy: kycRecord.reviewedBy,
                createdAt: kycRecord.createdAt,
                updatedAt: kycRecord.updatedAt,
                user: kycRecord.user
            },
            message: 'KYC record retrieved successfully'
        };
        
    } catch (error) {
        console.error('Error getting KYC by ID:', error);
        throw new Error(`Failed to get KYC record: ${error.message}`);
    }
};

const updateKYCStatus = async (kycId, status, rejectionReason = null, reviewedBy = null) => {
    try {
        const validStatuses = ['pending', 'approved', 'rejected', 'verified'];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        
        const kycRecord = await KYC.findOne({
            where: { id: kycId }
        });
        
        if (!kycRecord) {
            throw new Error(`KYC record not found: ${kycId}`);
        }
        
        const updateData = {
            status: status,
            updatedAt: new Date()
        };
        
        if (rejectionReason) {
            updateData.rejectionReason = rejectionReason;
        }
        
        if (reviewedBy) {
            updateData.reviewedBy = reviewedBy;
        }
        
        await kycRecord.update(updateData);
        
        console.log(`KYC status updated to: ${status}`);
        
        return {
            success: true,
            kycId: kycId,
            status: status,
            rejectionReason: rejectionReason,
            reviewedBy: reviewedBy,
            message: `KYC status updated to ${status}`
        };
        
    } catch (error) {
        console.error('Error updating KYC status:', error);
        throw new Error(`Failed to update KYC status: ${error.message}`);
    }
};

const getAllKYCRecords = async (filters = {}) => {
    try {
        let whereClause = {};
        
        if (filters.status) {
            whereClause.status = filters.status;
        }
        
        if (filters.verificationType) {
            whereClause.verificationType = filters.verificationType;
        }
        
        if (filters.dateFrom || filters.dateTo) {
            whereClause.createdAt = {};
            if (filters.dateFrom) {
                whereClause.createdAt[require('sequelize').Op.gte] = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                whereClause.createdAt[require('sequelize').Op.lte] = new Date(filters.dateTo + 'T23:59:59.999Z');
            }
        }
        
        const limit = filters.limit || 50;
        const offset = filters.offset || 0;
        
        const { count, rows: kycRecords } = await KYC.findAndCountAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber']
            }]
        });
        
        const formattedRecords = kycRecords.map(record => ({
            id: record.id,
            userId: record.userId,
            verificationType: record.verificationType,
            verificationId: record.verificationId,
            firstName: record.firstName,
            lastName: record.lastName,
            status: record.status,
            verificationReference: record.verificationReference,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            user: record.user
        }));
        
        return {
            success: true,
            records: formattedRecords,
            pagination: {
                total: count,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: (offset + limit) < count
            },
            filters: filters,
            message: `Retrieved ${formattedRecords.length} KYC records`
        };
        
    } catch (error) {
        console.error('Error getting all KYC records:', error);
        throw new Error(`Failed to get KYC records: ${error.message}`);
    }
};

module.exports = {
    getKYCStatus,
    getKYCById,
    updateKYCStatus,
    getAllKYCRecords
};
