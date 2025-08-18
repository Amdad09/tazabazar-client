import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function MarketDetails() {
    // Dummy Data (replace with API later)
    const vendors = [
        { id: 1, name: 'Fresh Mart', photo: '/vendor1.jpg', rating: 4.5 },
        { id: 2, name: 'Green Bazar', photo: '/vendor2.jpg', rating: 4.2 },
        { id: 3, name: 'Daily Shop', photo: '/vendor3.jpg', rating: 5 },
    ];

    const news = [
        {
            id: 1,
            title: 'Onion Prices Drop This Week',
            desc: 'Due to increased supply, onion prices decreased by 10% in local markets.',
            img: 'https://i.ibb.co.com/BVxvH4PD/pexels-michael-burrows-7129162.jpg',
        },
        {
            id: 2,
            title: 'Tips for Buying Fresh Fish',
            desc: 'Always check the eyes and gills of the fish for freshness.',
            img: 'https://i.ibb.co.com/tw6RFSzk/pexels-kindelmedia-8352787.jpg',
        },
    ];

    const updates = [
        {
            id: 1,
            date: 'Aug 20, 2025',
            message: 'Eid-ul-Adha Beef Price Updates released.',
        },
        {
            id: 2,
            date: 'Aug 22, 2025',
            message: 'Mango season officially started in Rajshahi.',
        },
        {
            id: 3,
            date: 'Aug 25, 2025',
            message: 'Strike alert: Vegetable supply may be affected.',
        },
    ];

    return (
        <div className="space-y-16 my-10 max-w-screen-xl mx-auto">
            {/* 📰 Market News & Tips Section */}
            <section className="py-10">
                <div className=" px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold mb-6 text-center"
                    >
                        📰 Market News & Tips
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {news.map((n) => (
                            <motion.div
                                key={n.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="card bg-card shadow-md rounded-2xl overflow-hidden"
                            >
                                <figure>
                                    <img
                                        src={n.img}
                                        alt={n.title}
                                        className="h-40 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title">{n.title}</h3>
                                    <p className="text-gray-600 text-sm">
                                        {n.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📢 Community Updates Section */}
            <section className=" px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-6 text-center"
                >
                    📢 Community Updates
                </motion.h2>
                <div className="space-y-4">
                    {updates.map((u) => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="alert shadow rounded-xl bg-card flex items-start gap-3"
                        >
                            <span className="text-sm text-gray-500 w-28">
                                {u.date}
                            </span>
                            <p className="text-gray-800 font-medium">
                                {u.message}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
