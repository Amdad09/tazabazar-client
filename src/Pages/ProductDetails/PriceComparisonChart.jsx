import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const PriceComparisonChart = ({ item }) => {
    if (!item || !item.priceHistory || !Array.isArray(item.priceHistory)) {
        return <p className="text-center  0">No price data available.</p>;
    }

    // Prepare data with price changes
    const priceData = item.priceHistory.map((entry, index, arr) => {
        const previousPrice = index > 0 ? arr[index - 1].price : null;
        const change = previousPrice !== null ? entry.price - previousPrice : 0;
        return {
            date: entry.date,
            price: entry.price,
            change,
        };
    });

    return (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <h2 className="text-xl font-semibold text-center mb-4">
                📊 7-Days Price & Change Comparison
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={priceData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        angle={-35}
                        textAnchor="end"
                        height={60}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name) => {
                            const label =
                                name === 'change' ? 'Price Change' : 'Price';
                            return [`৳${value}`, label];
                        }}
                    />
                    <Legend />
                    <Bar dataKey="price" fill="#183D3D" name="Price (৳)" />
                    <Bar dataKey="change" fill="#22c55e" name="Change (৳)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceComparisonChart;
