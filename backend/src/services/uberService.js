let accessToken = null;

export const getUberAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', process.env.UBER_CLIENT_ID);
    params.append('client_secret', process.env.UBER_CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'eats.order eats.store');

    try {
        const response = await fetch('https://login.uber.com/oauth/v2/token', {
            method: 'POST',
            body: params,
        });

        const data = await response.json();
        accessToken = data.access_token;
        console.log('✅ Uber Access Token Refreshed');
        return accessToken;
    } catch (error) {
        console.error('❌ Failed to get Uber Access Token:', error);
        throw error;
    }
};

export const getOrderDetails = async (orderId) => {
    if (!accessToken) await getUberAccessToken();

    try {
        let response = await fetch(`https://api.uber.com/v1/eats/order/${orderId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 401) {
            accessToken = await getUberAccessToken();
            response = await fetch(`https://api.uber.com/v1/eats/order/${orderId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        }

        if (!response.ok) throw new Error('Failed to fetch order details');
        return await response.json();
    } catch (error) {
        console.error(`❌ Error fetching details for order ${orderId}:`, error);
        throw error;
    }
};
