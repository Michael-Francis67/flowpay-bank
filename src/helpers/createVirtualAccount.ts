"use server";

export const createVirtualAccount = async (
    userData: {firstName: string; lastName: string; email: string},
    accessToken: string
) => {
    try {
        const payload = {
            accountReference: userData.email + Date.now().toString(),
            accountName: `${userData.firstName} ${userData.lastName}`,
            currencyCode: "NGN",
            contractCode: process.env.MONNIFY_CONTRACT_CODE,
            customerEmail: userData.email,
            customerName: `${userData.firstName} ${userData.lastName}`,
            getAllAvailableBanks: true,
        };

        const response = await fetch(`${process.env.MONNIFY_BASE_URL!}/api/v2/bank-transfer/reserved-accounts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.requestSuccessful) {
            return result.responseBody;
        } else {
            throw new Error(result.responseMessage);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
