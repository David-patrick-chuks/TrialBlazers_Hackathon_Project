const validateBVNData = (bvnData) => {
    if (!bvnData) {
        throw new Error('BVN data is required');
    }
    
    if (!bvnData.userId) {
        throw new Error('User ID is required');
    }
    
    if (!bvnData.bvn) {
        throw new Error('BVN is required');
    }
    
    if (!/^\d{11}$/.test(bvnData.bvn)) {
        throw new Error('BVN must be 11 digits');
    }
    
    if (bvnData.validation) {
        if (bvnData.validation.first_name && typeof bvnData.validation.first_name !== 'string') {
            throw new Error('First name validation must be a string');
        }
        
        if (bvnData.validation.last_name && typeof bvnData.validation.last_name !== 'string') {
            throw new Error('Last name validation must be a string');
        }
        
        if (bvnData.validation.date_of_birth && typeof bvnData.validation.date_of_birth !== 'string') {
            throw new Error('Date of birth validation must be a string');
        }
        
        if (bvnData.validation.selfie && typeof bvnData.validation.selfie !== 'string') {
            throw new Error('Selfie validation must be a string');
        }
    }
};

const validateNINData = (ninData) => {
    if (!ninData) {
        throw new Error('NIN data is required');
    }
    
    if (!ninData.userId) {
        throw new Error('User ID is required');
    }
    
    if (!ninData.nin) {
        throw new Error('NIN is required');
    }
    
    if (!/^\d{11}$/.test(ninData.nin)) {
        throw new Error('NIN must be 11 digits');
    }
    
    if (ninData.validation) {
        if (ninData.validation.first_name && typeof ninData.validation.first_name !== 'string') {
            throw new Error('First name validation must be a string');
        }
        
        if (ninData.validation.last_name && typeof ninData.validation.last_name !== 'string') {
            throw new Error('Last name validation must be a string');
        }
        
        if (ninData.validation.date_of_birth && typeof ninData.validation.date_of_birth !== 'string') {
            throw new Error('Date of birth validation must be a string');
        }
        
        if (ninData.validation.selfie && typeof ninData.validation.selfie !== 'string') {
            throw new Error('Selfie validation must be a string');
        }
    }
};

module.exports = {
    validateBVNData,
    validateNINData
};
