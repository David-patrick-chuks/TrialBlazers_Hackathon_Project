const validatePaymentData = (paymentData) => {
    if (!paymentData) {
        throw new Error('Payment data is required');
    }
    
    if (!paymentData.payerId) {
        throw new Error('Payer ID is required');
    }
    
    if (!paymentData.receiverId) {
        throw new Error('Receiver ID is required');
    }
    
    if (!paymentData.amount || paymentData.amount <= 0) {
        throw new Error('Valid amount is required (in kobo)');
    }
    
    if (!paymentData.payer) {
        throw new Error('Payer information is required');
    }
    
    if (!paymentData.payer.email) {
        throw new Error('Payer email is required');
    }
    
    if (!paymentData.payer.fullName) {
        throw new Error('Payer full name is required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentData.payer.email)) {
        throw new Error('Invalid email format');
    }
    
    if (paymentData.amount < 1 || paymentData.amount > 100000000) {
        throw new Error('Amount must be between 1 kobo and 1,000,000 NGN');
    }
};

const validateWithdrawalData = (withdrawalData) => {
    if (!withdrawalData) {
        throw new Error('Withdrawal data is required');
    }
    
    if (!withdrawalData.runnerId) {
        throw new Error('Runner ID is required');
    }
    
    if (!withdrawalData.amount || withdrawalData.amount <= 0) {
        throw new Error('Valid withdrawal amount is required');
    }
    
    if (!withdrawalData.bankDetailsId) {
        throw new Error('Bank details ID is required');
    }
    
    if (withdrawalData.amount < 100) {
        throw new Error('Minimum withdrawal amount is 100 NGN');
    }
    
    if (withdrawalData.amount > 1000000) {
        throw new Error('Maximum withdrawal amount is 1,000,000 NGN');
    }
};

const validateBankDetailsData = (bankDetailsData) => {
    if (!bankDetailsData) {
        throw new Error('Bank details data is required');
    }
    
    if (!bankDetailsData.runnerId) {
        throw new Error('Runner ID is required');
    }
    
    if (!bankDetailsData.bankCode) {
        throw new Error('Bank code is required');
    }
    
    if (!bankDetailsData.accountNumber) {
        throw new Error('Account number is required');
    }
    
    if (!/^\d{3}$/.test(bankDetailsData.bankCode)) {
        throw new Error('Bank code must be 3 digits');
    }
    
    if (!/^\d{10}$/.test(bankDetailsData.accountNumber)) {
        throw new Error('Account number must be 10 digits');
    }
};

const validateAccountData = (accountData) => {
    if (!accountData) {
        throw new Error('Account data is required');
    }
    
    if (!accountData.bank) {
        throw new Error('Bank code is required');
    }
    
    if (!accountData.account) {
        throw new Error('Account number is required');
    }
    
    if (!/^\d{3}$/.test(accountData.bank)) {
        throw new Error('Bank code must be 3 digits');
    }
    
    if (!/^\d{10}$/.test(accountData.account)) {
        throw new Error('Account number must be 10 digits');
    }
};

module.exports = {
    validatePaymentData,
    validateWithdrawalData,
    validateBankDetailsData,
    validateAccountData
};
