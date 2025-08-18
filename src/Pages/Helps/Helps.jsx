import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Helps = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Support Request:', formData);
        toast.success('Your request has been submitted!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <section className="max-w-4xl mx-auto my-12 p-6 bg-card rounded-2xl shadow-lg">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-primary text-center mb-6"
            >
                🛠️ Help & Support
            </motion.h2>

            <p className="text-center text-primary mb-6">
                Need help? Fill out the form below or check our FAQs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    required
                />
                <button type="submit" className="btn btn-primary text-secondary w-full">
                    Submit Request
                </button>
            </form>

            {/* Optional FAQ section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2 text-primary">FAQs</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>How can I track my order?</li>
                    <li>How do I change my account details?</li>
                    <li>How do I contact a vendor?</li>
                </ul>
            </div>
        </section>
    );
};

export default Helps;
