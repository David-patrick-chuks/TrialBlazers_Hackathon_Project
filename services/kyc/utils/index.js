const formatBVNResponse = (verificationData) => {
    return {
        success: true,
        verificationReference: verificationData.reference,
        bvn: verificationData.id,
        firstName: verificationData.first_name,
        lastName: verificationData.last_name,
        middleName: verificationData.middle_name,
        dateOfBirth: verificationData.date_of_birth,
        phoneNumber: verificationData.phone_number,
        gender: verificationData.gender,
        address: verificationData.address,
        image: verificationData.image,
        validationResults: verificationData.validation,
        status: 'verified',
        koraResponse: verificationData,
        message: 'BVN verification completed successfully'
    };
};

const formatNINResponse = (verificationData) => {
    return {
        success: true,
        verificationReference: verificationData.reference,
        nin: verificationData.id,
        firstName: verificationData.first_name,
        lastName: verificationData.last_name,
        middleName: verificationData.middle_name,
        dateOfBirth: verificationData.date_of_birth,
        phoneNumber: verificationData.phone_number,
        gender: verificationData.gender,
        address: verificationData.address,
        email: verificationData.email,
        birthState: verificationData.birth_state,
        birthLga: verificationData.birth_lga,
        birthCountry: verificationData.birth_country,
        nextOfKinState: verificationData.next_of_kin_state,
        religion: verificationData.religion,
        signature: verificationData.signature,
        image: verificationData.image,
        validationResults: verificationData.validation,
        status: 'verified',
        koraResponse: verificationData,
        message: 'NIN verification completed successfully'
    };
};

const formatKYCRecord = (record) => {
    return {
        id: record.id,
        userId: record.userId,
        verificationType: record.verificationType,
        verificationId: record.verificationId,
        firstName: record.firstName,
        lastName: record.lastName,
        middleName: record.middleName,
        dateOfBirth: record.dateOfBirth,
        phoneNumber: record.phoneNumber,
        gender: record.gender,
        address: record.address,
        image: record.image,
        nepaBillUrl: record.nepaBillUrl,
        validationResults: record.validationResults,
        verificationReference: record.verificationReference,
        status: record.status,
        rejectionReason: record.rejectionReason,
        reviewedBy: record.reviewedBy,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt
    };
};

const formatKYCStatus = (kycRecords) => {
    if (kycRecords.length === 0) {
        return {
            kycStatus: 'not_verified',
            records: [],
            totalRecords: 0
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
        kycStatus: kycStatus,
        records: formattedRecords,
        totalRecords: kycRecords.length
    };
};

const isValidBVN = (bvn) => {
    return /^\d{11}$/.test(bvn);
};

const isValidNIN = (nin) => {
    return /^\d{11}$/.test(nin);
};

const extractValidationData = (validationData) => {
    if (!validationData) return null;
    
    const extracted = {};
    
    if (validationData.first_name) {
        extracted.first_name = validationData.first_name;
    }
    
    if (validationData.last_name) {
        extracted.last_name = validationData.last_name;
    }
    
    if (validationData.date_of_birth) {
        extracted.date_of_birth = validationData.date_of_birth;
    }
    
    if (validationData.selfie) {
        extracted.selfie = validationData.selfie;
    }
    
    return Object.keys(extracted).length > 0 ? extracted : null;
};

module.exports = {
    formatBVNResponse,
    formatNINResponse,
    formatKYCRecord,
    formatKYCStatus,
    isValidBVN,
    isValidNIN,
    extractValidationData
};
