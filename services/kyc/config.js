const config = {
    KORA_SECRET_KEY: process.env.KORA_SECRET_KEY,
    KORA_API_URL: 'https://api.korapay.com/merchant/api/v1'
};

if (!config.KORA_SECRET_KEY) {
    throw new Error('KORA_SECRET_KEY environment variable is required');
}

module.exports = config;
