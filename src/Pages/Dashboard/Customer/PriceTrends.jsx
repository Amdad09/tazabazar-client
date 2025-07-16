import { useQuery } from '@tanstack/react-query';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const PriceTrends = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedProduct, setSelectedProduct] = useState(null);

    // ✅ Tracked product names
    const { data: trackedItems = [], isLoading: loadingTracked } = useQuery({
        queryKey: ['tracked-items'],
        queryFn: async () => {
            const res = await axiosSecure.get('/watchlist/tracked');
            return res.data;
        },
    });

    // ✅ Set first product as default when loaded
    useEffect(() => {
        if (trackedItems.length > 0 && !selectedProduct) {
            setSelectedProduct(trackedItems[0]); // প্রথম item auto select
        }
    }, [trackedItems, selectedProduct]);

    // ✅ Selected product's trend
    const { data: trendData = [], isLoading: loadingTrends } = useQuery({
        queryKey: ['price-trend', selectedProduct],
        enabled: !!selectedProduct,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/price-trends/${selectedProduct}`,
            );
            return res.data;
        },
    });

    if (loadingTracked || (selectedProduct && loadingTrends)) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-white rounded ">
            <h2 className="text-xl font-semibold mb-4">📈 Price Trends</h2>

            <div className="flex flex-wrap gap-2 mb-12 lg:mb-32">
                {trackedItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setSelectedProduct(item)}
                        className={`btn btn-sm ${
                            selectedProduct === item
                                ? 'btn-primary text-secondary'
                                : 'btn-outline border border-primary text-secondary'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : selectedProduct ? (
                <p>No data available for {selectedProduct}</p>
            ) : (
                <p>📌 Please select a product to view trends</p>
            )}
        </div>
    );
};

export default PriceTrends;
