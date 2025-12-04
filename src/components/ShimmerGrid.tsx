"use client";

import { motion } from "framer-motion";

const ShimmerGrid = ({ count = 5 }) => {
    return (
        <div className="grid grid-cols-1 gap-6 w-full">
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    className="bg-white/10 relative rounded-xl p-6 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    {/* Shimmer effect overlay */}
                    <motion.div
                        className="absolute inset-0 -z-10"
                        initial={{ backgroundPosition: "200% 0" }}
                        animate={{ backgroundPosition: "-200% 0" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 1.5,
                            repeatDelay: 1
                        }}
                        style={{
                            background: `linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.1), 
                transparent)`,
                            backgroundSize: "200% 100%"
                        }}
                    />

                    <div className="flex items-start">
                        {/* Icon placeholder */}
                        <div className="mr-4 mt-1 w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>

                        <div className="flex-1">
                            {/* Title and status badge placeholders */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="h-6 bg-gray-600 rounded w-1/3 animate-pulse"></div>
                                <div className="h-6 bg-gray-600 rounded w-16 animate-pulse"></div>
                            </div>

                            {/* Status indicator and uptime, response time */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2 bg-gray-600 animate-pulse"></div>
                                    <div className="h-4 bg-gray-600 rounded w-24 animate-pulse"></div>
                                </div>
                                <div className="h-4 bg-gray-600 rounded w-12 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ShimmerGrid;