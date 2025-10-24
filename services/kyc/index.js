const {
    verifyBVN,
    verifyNIN
} = require('./core/verification');

const {
    getKYCStatus,
    getKYCById,
    updateKYCStatus,
    getAllKYCRecords
} = require('./core/management');

const {
    validateBVNData,
    validateNINData
} = require('./validation');

const {
    formatBVNResponse,
    formatNINResponse,
    formatKYCRecord,
    formatKYCStatus,
    isValidBVN,
    isValidNIN,
    extractValidationData
} = require('./utils');

module.exports = {
    verifyBVN,
    verifyNIN,
    getKYCStatus,
    getKYCById,
    updateKYCStatus,
    getAllKYCRecords,
    validateBVNData,
    validateNINData,
    formatBVNResponse,
    formatNINResponse,
    formatKYCRecord,
    formatKYCStatus,
    isValidBVN,
    isValidNIN,
    extractValidationData
};
