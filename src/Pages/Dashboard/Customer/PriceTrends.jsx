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
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const PriceTrends = () => {
    const axiosSecure = useAxiosSecure();
    const { data: trends, isLoading } = useQuery({
        queryKey: ['price-trends'],
        queryFn: async () => {
            const res = await axiosSecure.get('/price-trends');
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">📈 Price Trends</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trends}>
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
        </div>
    );
};

export default PriceTrends;
