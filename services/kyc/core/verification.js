const axios = require('axios');
const KYC = require('../../../models/kyc');
const User = require('../../../models/users');
const config = require('../config');
const { validateBVNData, validateNINData } = require('../validation');

const verifyBVN = async (bvnData) => {
    try {
        validateBVNData(bvnData);
        
        console.log(`Verifying BVN for user: ${bvnData.userId}`);
        
        const user = await User.findOne({
            where: { id: bvnData.userId }
        });
        
        if (!user) {
            throw new Error(`User not found: ${bvnData.userId}`);
        }
        
        const koraPayload = {
            id: bvnData.bvn,
            verification_consent: true
        };
        
        if (bvnData.validation) {
            koraPayload.validation = bvnData.validation;
        }
        
        console.log('Calling KoraPay BVN verification API...');
        
        const response = await axios.post(
            `${config.KORA_API_URL}/identities/ng/bvn`,
            koraPayload,
            {
                headers: {
                    Authorization: `Bearer ${config.KORA_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );
        
        console.log('KoraPay BVN verification response received');
        
        if (!response.data || !response.data.data) {
            throw new Error('Invalid response from KoraPay BVN verification API');
        }
        
        const verificationData = response.data.data;
        
        const kycRecord = await KYC.create({
            userId: bvnData.userId,
            verificationType: 'BVN',
            verificationId: verificationData.id,
            firstName: verificationData.first_name,
            lastName: verificationData.last_name,
            middleName: verificationData.middle_name,
            dateOfBirth: verificationData.date_of_birth ? new Date(verificationData.date_of_birth) : null,
            phoneNumber: verificationData.phone_number,
            gender: verificationData.gender,
            address: verificationData.address,
            image: verificationData.image,
            nepaBillUrl: bvnData.nepaBillUrl,
            validationResults: verificationData.validation,
            verificationReference: verificationData.reference,
            status: 'verified'
        });
        
        console.log(`BVN verification completed successfully`);
        console.log(`KYC Record ID: ${kycRecord.id}`);
        console.log(`BVN: ${verificationData.id}`);
        console.log(`Name: ${verificationData.first_name} ${verificationData.last_name}`);
        
        return {
            success: true,
            kycId: kycRecord.id,
            verificationReference: verificationData.reference,
            bvn: verificationData.id,
            firstName: verificationData.first_name,
            lastName: verificationData.last_name,
            middleName: verificationData.middle_name,
            dateOfBirth: verificationData.date_of_birth,
            phoneNumber: verificationData.phone_number,
            gender: verificationData.gender,
            address: verificationData.address,
            validationResults: verificationData.validation,
            status: 'verified',
            koraResponse: verificationData,
            message: 'BVN verification completed successfully'
        };
        
    } catch (error) {
        console.error('Error verifying BVN:', error);
        
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        }
        
        throw new Error(`Failed to verify BVN: ${error.message}`);
    }
};

const verifyNIN = async (ninData) => {
    try {
        validateNINData(ninData);
        
        console.log(`Verifying NIN for user: ${ninData.userId}`);
        
        const user = await User.findOne({
            where: { id: ninData.userId }
        });
        
        if (!user) {
            throw new Error(`User not found: ${ninData.userId}`);
        }
        
        const koraPayload = {
            id: ninData.nin,
            verification_consent: true
        };
        
        if (ninData.validation) {
            koraPayload.validation = ninData.validation;
        }
        
        console.log('Calling KoraPay NIN verification API...');
        
        const response = await axios.post(
            `${config.KORA_API_URL}/identities/ng/nin`,
            koraPayload,
            {
                headers: {
                    Authorization: `Bearer ${config.KORA_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );
        
        console.log('KoraPay NIN verification response received');
        
        if (!response.data || !response.data.data) {
            throw new Error('Invalid response from KoraPay NIN verification API');
        }
        
        const verificationData = response.data.data;
        
        const kycRecord = await KYC.create({
            userId: ninData.userId,
            verificationType: 'NIN',
            verificationId: verificationData.id,
            firstName: verificationData.first_name,
            lastName: verificationData.last_name,
            middleName: verificationData.middle_name,
            dateOfBirth: verificationData.date_of_birth ? new Date(verificationData.date_of_birth) : null,
            phoneNumber: verificationData.phone_number,
            gender: verificationData.gender,
            address: verificationData.address,
            image: verificationData.image,
            nepaBillUrl: ninData.nepaBillUrl,
            validationResults: verificationData.validation,
            verificationReference: verificationData.reference,
            status: 'verified'
        });
        
        console.log(`NIN verification completed successfully`);
        console.log(`KYC Record ID: ${kycRecord.id}`);
        console.log(`NIN: ${verificationData.id}`);
        console.log(`Name: ${verificationData.first_name} ${verificationData.last_name}`);
        
        return {
            success: true,
            kycId: kycRecord.id,
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
            validationResults: verificationData.validation,
            status: 'verified',
            koraResponse: verificationData,
            message: 'NIN verification completed successfully'
        };
        
    } catch (error) {
        console.error('Error verifying NIN:', error);
        
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        }
        
        throw new Error(`Failed to verify NIN: ${error.message}`);
    }
};

module.exports = {
    verifyBVN,
    verifyNIN
};
