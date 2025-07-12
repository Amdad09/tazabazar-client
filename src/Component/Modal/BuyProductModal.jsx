import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const BuyProductModal = ({ isOpen, onClose, product }) => {
    const [quantities, setQuantities] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (product?.items?.length) {
            setQuantities(product.items.map(() => 1));
        }
    }, [product]);

    const handleQuantityChange = (index, value, maxQty) => {
        const newQuantities = [...quantities];
        const newValue = Math.max(1, Math.min(maxQty, parseInt(value || 1)));
        newQuantities[index] = newValue;
        setQuantities(newQuantities);
    };

    const totalCost = product.items?.reduce((acc, item, idx) => {
        const latestPrice = item.priceHistory?.slice(-1)[0]?.price || 0;
        const qty = quantities[idx] || 1;
        return acc + latestPrice * qty;
    }, 0);

    const handleConfirm = async () => {
        const orderItems = product.items.map((item, idx) => {
            const latestPrice = item.priceHistory?.slice(-1)[0]?.price || 0;
            const qty = quantities[idx] || 1;
            return {
                name: item.name,
                quantity: qty,
                pricePerUnit: latestPrice,
                subtotal: latestPrice * qty,
            };
        });

        const orderData = {
            market: product.market,
            date: product.date,
            image: product.image,
            seller: product.seller,
            customer: {
                name: user?.displayName || 'Unknown',
                email: user?.email || 'No email',
                photo: user?.photoURL || '',
            },
            items: orderItems,
            totalPrice: totalCost,
            // status: 'pending', 
            createdAt: new Date(),
        };

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                orderData,
            );
            toast.success('✅ Order placed successfully!');
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to place order.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-2xl rounded-xl bg-white p-6 space-y-6 shadow-lg">
                    <DialogTitle className="text-2xl font-bold text-lime-600">
                        🛍️ Confirm Purchase from {product.market}
                    </DialogTitle>

                    <div className="space-y-4">
                        {product.items?.map((item, index) => {
                            const latestPrice =
                                item.priceHistory?.slice(-1)[0]?.price || 0;
                            const maxQty = parseInt(item.quantity || 1);

                            return (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 bg-gray-50 space-y-2"
                                >
                                    <p className="font-semibold text-gray-700">
                                        🥕 {item.name} — ৳{latestPrice}/kg
                                    </p>
                                    <input
                                        type="number"
                                        min={1}
                                        max={maxQty}
                                        value={quantities[index] || 1}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                index,
                                                e.target.value,
                                                maxQty,
                                            )
                                        }
                                        className="input input-bordered w-32"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Available: {maxQty} kg
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <p><strong>Seller: </strong> {user?.displayName}</p>

                    <div className="text-lg font-semibold text-right text-lime-700">
                        💰 Total: ৳{totalCost}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button onClick={onClose} className="btn btn-outline">
                            ❌ Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="btn btn-success"
                        >
                            ✅ Confirm Purchase
                        </button>
                    </div>
                    {/* stripe checkout form */}
                    
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default BuyProductModal;
