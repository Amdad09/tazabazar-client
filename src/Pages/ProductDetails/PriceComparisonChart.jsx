import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const PriceComparisonChart = ({ item }) => {
    if (!item || !item.priceHistory || !Array.isArray(item.priceHistory)) {
        return <p>No price data available.</p>;
    }

    // Calculate daily price changes (compared to previous day)
    const priceData = item.priceHistory.map((entry, index, arr) => {
        const previousPrice = index > 0 ? arr[index - 1].price : null;
        const change = previousPrice !== null ? entry.price - previousPrice : 0;
        return {
            date: entry.date,
            price: entry.price,
            change, // price difference
        };
    });

    return (
        <div className="w-full h-[400px]">
            <h2 className="text-xl font-semibold text-center mb-4">
                7-Day Price and Change Comparison
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={priceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === 'change') {
                                return [`৳${value}`, 'Price Change'];
                            }
                            return [`৳${value}`, 'Price'];
                        }}
                    />
                    <Legend />
                    <Bar dataKey="price" fill="#8884d8" name="Price (৳)" />
                    <Bar dataKey="change" fill="#82ca9d" name="Change (৳)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceComparisonChart;
