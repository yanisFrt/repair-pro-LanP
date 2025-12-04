export async function checkUserExists(email: string): Promise<boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PAYMENT_API_EP || "http://localhost:3007"}/payments/user-exists`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return !!result.exists?.email;
    } catch (error) {
        console.error("Error checking user:", error);
        throw error;
    }
}
