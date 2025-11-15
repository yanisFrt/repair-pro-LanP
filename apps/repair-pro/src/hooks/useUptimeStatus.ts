// hooks/useUptimeStatus.ts
import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "serviceStatus";
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
const FETCH_TIMEOUT = 5000;

interface ServiceConfig {
    name: string;
    url: string;
}

interface ServiceStatus {
    name: string;
    url: string;
    uptime: string;
    status: "Operational" | "Down";
    lastChecked: number;
    responseTime?: number;
}

export const useUptimeStatus = (services: ServiceConfig[]) => {
    const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [isClient, setIsClient] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        setIsClient(true);
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const checkStatus = async (forceRefresh = false) => {
        if (!isClient || !isMountedRef.current) return;

        const cachedData = localStorage.getItem(STORAGE_KEY);
        const now = Date.now();
        let shouldCheck = forceRefresh;
        let cachedStatuses: ServiceStatus[] | null = null;

        // Check cache validity
        if (cachedData && !forceRefresh) {
            try {
                const parsedData = JSON.parse(cachedData);
                const isExpired = now - parsedData.lastUpdated > CACHE_DURATION;

                if (!isExpired) {
                    cachedStatuses = parsedData.statuses;
                    // Only set from cache if component is still mounted
                    if (isMountedRef.current) {
                        setServiceStatuses(cachedStatuses);
                        setLastUpdated(new Date(parsedData.lastUpdated).toLocaleString());
                        setLoading(false);
                    }
                    return;
                }
                shouldCheck = true;
            } catch (e) {
                console.error("Cache parsing error:", e);
                shouldCheck = true;
            }
        }

        setLoading(true);

        try {
            const statuses: ServiceStatus[] = [];
            const abortControllers = services.map(() => new AbortController());

            await Promise.allSettled(
                services.map(async (service, index) => {
                    const controller = abortControllers[index];
                    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

                    try {
                        const start = Date.now();
                        const response = await fetch(service.url, {
                            cache: "no-store",
                            signal: controller.signal,
                        });

                        clearTimeout(timeoutId);
                        const responseTime = Date.now() - start;

                        if (response.ok) {
                            const text = await response.text();
                            if (text.trim() === "OK") {
                                statuses[index] = {
                                    name: service.name,
                                    url: service.url,
                                    uptime: "99.99%",
                                    status: "Operational",
                                    lastChecked: now,
                                    responseTime,
                                };
                            } else {
                                statuses[index] = {
                                    name: service.name,
                                    url: service.url,
                                    uptime: "0.00%",
                                    status: "Down",
                                    lastChecked: now,
                                    responseTime,
                                };
                            }
                        } else {
                            statuses[index] = {
                                name: service.name,
                                url: service.url,
                                uptime: "0.00%",
                                status: "Down",
                                lastChecked: now,
                                responseTime,
                            };
                        }
                    } catch (error) {
                        clearTimeout(timeoutId);
                        statuses[index] = {
                            name: service.name,
                            url: service.url,
                            uptime: "0.00%",
                            status: "Down",
                            lastChecked: now,
                        };
                    }
                })
            );

            abortControllers.forEach((controller) => controller.abort());

            if (isMountedRef.current) {
                setServiceStatuses(statuses);
                setLastUpdated(new Date(now).toLocaleString());

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        statuses,
                        lastUpdated: now,
                    })
                );
            }
        } catch (e) {
            console.error("Status check failed:", e);
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (isClient) {
            checkStatus();
        }
    }, [isClient]);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return {
        serviceStatuses,
        loading,
        lastUpdated,
        refresh: () => checkStatus(true),
    };
};
