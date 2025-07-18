import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const PriceComparisonChart = ({ item }) => {
    const [previousDate, setPreviousDate] = useState('');

    if (!item || !Array.isArray(item.priceHistory)) {
        return <p>No price history available.</p>;
    }

    // 🔍 Unique dates for dropdown (except latest date)
    const availableDates = item.priceHistory.map((p) => p.date).slice(0, -1);

    // 📊 Get latest price
    const latestPriceObj = item.priceHistory[item.priceHistory.length - 1];

    // 🔙 Get selected previous date's price
    const previousPriceObj = item.priceHistory.find(
        (ph) => ph.date === previousDate,
    );

    // 🧠 Prepare data for chart
    const chartData = [
        {
            name: 'Previous Price',
            price: previousPriceObj ? Number(previousPriceObj.price) : 0,
        },
        {
            name: 'Latest Price',
            price: latestPriceObj ? Number(latestPriceObj.price) : 0,
        },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">📊 Price Comparison</h2>

            {/* 🔽 Dropdown to select previous date */}
            <select
                className="border p-2 rounded mb-4"
                value={previousDate}
                onChange={(e) => setPreviousDate(e.target.value)}
            >
                <option value="">-- Select Previous Date --</option>
                {availableDates.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>

            {/* 📈 Chart */}
            {previousDate ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="price" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-gray-600">
                    Please select a date to compare prices.
                </p>
            )}
        </div>
    );
};

export default PriceComparisonChart;
