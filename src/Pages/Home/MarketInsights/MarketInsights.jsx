// components/MarketInsights.jsx

import { motion } from 'framer-motion';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
    { date: 'Sun', price: 30 },
    { date: 'Mon', price: 28 },
    { date: 'Tue', price: 32 },
];

const MarketInsights = () => {
    return (
        <motion.section
            // data-aos="zoom-in-up"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-screen-xl mx-auto py-24 p-6 bg-card rounded-xl shadow-md"
        >
            <h2 className="text-3xl font-bold text-primary mb-4 text-center">
                🧠 Market Insights & Tips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {/* Weekly Tip */}
                <div className="  p-4 rounded-lg shadow text-gray-800">
                    <h4 className="font-bold text-lg mb-2">
                        📌 Weekly Market Tip
                    </h4>
                    <p>
                        🥕 Buy your leafy greens before 9am for the best
                        freshness.
                    </p>
                </div>

                {/* Trend Chart */}
                <div className="  p-4 rounded-lg shadow text-gray-800">
                    <h4 className="font-bold text-lg mb-2">
                        📈 Onion Price Trend
                    </h4>
                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={data}>
                            <XAxis dataKey="date" />
                            <Tooltip />
                            <Bar dataKey="price" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Seasonal Suggestion */}
                <div className="  p-4 rounded-lg shadow text-gray-800">
                    <h4 className="font-bold text-lg mb-2">
                        🌿 Seasonal Picks
                    </h4>
                    <ul className="list-disc list-inside">
                        <li>Spinach</li>
                        <li>Tomato</li>
                        <li>Eggmarket</li>
                    </ul>
                </div>

                {/* Vendor of the Week */}
                <div className="  p-4 rounded-lg shadow text-gray-800">
                    <h4 className="font-bold text-lg mb-2">
                        👨‍🌾 Vendor of the Week
                    </h4>
                    <p>
                        🏪 <strong>Hasan Bazar</strong> — 4.9★ based on 120
                        reviews
                    </p>
                </div>
            </div>
        </motion.section>
    );
};

export default MarketInsights;
