import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { FaDollarSign, FaUserAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';
import OrderChart from '../../Chart/OrderChart';
import { motion } from 'framer-motion';

const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure('/admin-stats');
            return data;
        },
    });

    if (isLoading) return <Loading />;

    const stats = [
        {
            icon: <FaDollarSign className="text-4xl text-primary" />,
            title: 'Total Revenue',
            value: `৳${data?.totalRevenue}`,
        },
        {
            icon: <BsFillCartPlusFill className="text-4xl text-primary" />,
            title: 'Total Orders',
            value: data?.totalOrder,
        },
        {
            icon: <BsFillHouseDoorFill className="text-4xl text-primary" />,
            title: 'Total Markets',
            value: data?.totalMarket,
        },
        {
            icon: <FaUserAlt className="text-4xl text-primary" />,
            title: 'Total Users',
            value: data?.totalUser,
        },
    ];

    return (
        <section className="p-5 lg:p-10 space-y-12 ">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <motion.div
                        key={index}
                        className="rounded-xl border border-gray-100 shadow-sm bg-green-300/20 p-6 hover:shadow-md transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-between">
                            {item.icon}
                            <div className="text-right">
                                <h4 className="text-sm text-gray-500 font-medium">
                                    {item.title}
                                </h4>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Dashboard Charts & Updates */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <motion.div
                    className="xl:col-span-2 bg-white rounded-xl shadow-md p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            📊 Weekly Overview
                        </h2>
                        <span className="text-sm text-gray-500">
                            Updated: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <OrderChart barChartData={data?.barChartData} />
                </motion.div>
                <motion.div
                    className="bg-white rounded-xl shadow-md p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                        🧠 Market Insight
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            📈 Weekly growth:{' '}
                            <span className="text-green-600 font-medium">
                                +12%
                            </span>
                        </li>
                        
                        <li>
                            👥 Active Users:{' '}
                            <span className="text-blue-600 font-medium">
                                {data?.totalUser || 0}
                            </span>
                        </li>
                        <li>
                            🕐 Last update:{' '}
                            <span className="text-gray-500">
                                {new Date().toLocaleTimeString()}
                            </span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default AdminStatistics;
