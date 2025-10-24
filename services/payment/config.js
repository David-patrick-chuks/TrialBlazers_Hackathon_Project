const config = {
    KORA_SECRET_KEY: process.env.KORA_SECRET_KEY,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    KORA_API_URL: 'https://api.korapay.com/merchant/api/v1',
    COMMISSION_PERCENTAGE: parseFloat(process.env.COMMISSION_PERCENTAGE) || 15
};

if (!config.KORA_SECRET_KEY) {
    throw new Error('KORA_SECRET_KEY environment variable is required');
}

if (!config.BASE_URL) {
    console.warn('BASE_URL environment variable is not set, using localhost fallback');
}

console.log(`Commission percentage set to: ${config.COMMISSION_PERCENTAGE}%`);

module.exports = config;
