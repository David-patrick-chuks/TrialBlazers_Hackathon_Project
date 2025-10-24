const config = require('../config');

const calculateCommission = (amount) => {
    const totalAmount = parseFloat(amount);
    const commissionAmount = (totalAmount * config.COMMISSION_PERCENTAGE) / 100;
    const amountAfterCommission = totalAmount - commissionAmount;
    
    return {
        totalAmount: totalAmount,
        commissionPercentage: config.COMMISSION_PERCENTAGE,
        commissionAmount: commissionAmount,
        amountAfterCommission: amountAfterCommission
    };
};

const determinePaymentType = (payment, userType) => {
    const description = payment.description?.toLowerCase() || '';
    const paymentMethod = payment.paymentMethod?.toLowerCase() || '';
    
    if (description.includes('refund') || paymentMethod.includes('refund')) {
        return 'refund';
    } else if (description.includes('withdrawal') || paymentMethod.includes('disburse')) {
        return 'payout';
    } else if (description.includes('top-up') || description.includes('wallet')) {
        return 'wallet_topup';
    } else {
        return 'payment';
    }
};

const determinePaymentDirection = (payment, userType) => {
    if (userType === 'client') {
        return 'outgoing';
    } else {
        const type = determinePaymentType(payment, userType);
        if (type === 'payout') {
            return 'outgoing';
        } else {
            return 'incoming';
        }
    }
};

const getCounterparty = (payment, userType) => {
    if (userType === 'client') {
        return {
            id: payment.receiverId,
            name: payment.receiver ? `${payment.receiver.firstName} ${payment.receiver.lastName}` : 'Unknown',
            email: payment.receiver?.email,
            phone: payment.receiver?.phoneNumber
        };
    } else {
        return {
            id: payment.payerId,
            name: payment.payer ? `${payment.payer.firstName} ${payment.payer.lastName}` : 'Unknown',
            email: payment.payer?.email,
            phone: payment.payer?.phoneNumber
        };
    }
};

const calculateWalletImpact = (payment) => {
    const type = determinePaymentType(payment, 'runner');
    
    if (type === 'payment') {
        const commission = calculateCommission(payment.amount);
        return {
            type: 'credit',
            grossAmount: parseFloat(payment.amount),
            commissionAmount: commission.commissionAmount,
            netAmount: commission.netAmount,
            commissionPercentage: commission.commissionPercentage
        };
    } else if (type === 'payout') {
        return {
            type: 'debit',
            amount: parseFloat(payment.amount)
        };
    }
    
    return null;
};

module.exports = {
    calculateCommission,
    determinePaymentType,
    determinePaymentDirection,
    getCounterparty,
    calculateWalletImpact
};
