// hooks/useCountryDetection.ts
import { useState, useEffect } from 'react';

interface GeoLocationData {
    country_name: string;
    country_code2: string;
    timestamp: number;
}

export function useCountryDetection() {
    const [country, setCountry] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                // Check localStorage first
                const stored = localStorage.getItem('user_country');

                if (stored) {
                    const data: GeoLocationData = JSON.parse(stored);
                    // Check if data is less than 24 hours old
                    const isRecent = Date.now() - data.timestamp < 24 * 60 * 60 * 1000;

                    if (isRecent) {
                        setCountry(data.country_code2);
                        setLoading(false);
                        return;
                    }
                }

                if (!process.env.NEXT_PUBLIC_GEO_IP_API) {
                    console.error("NO GEO API KEY FOUND!");
                    return;
                }

                // Fetch from API
                const response = await fetch(
                    `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEO_IP_API}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch location');
                }

                const data = await response.json();

                // Store in localStorage
                const geoData: GeoLocationData = {
                    country_name: data.location.country_name,
                    country_code2: data.location.country_code2,
                    timestamp: Date.now(),
                };

                localStorage.setItem('user_country', JSON.stringify(geoData));
                setCountry(data.location.country_code2);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, []);

    return { country, loading, error };
}
