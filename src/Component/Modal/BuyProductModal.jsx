import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BuyProductModal = ({ isOpen, onClose, product, setSelectedOrder }) => {
    const [quantities, setQuantities] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // For payment modal

    // Always ensure items is an array
    const itemsArray = Array.isArray(product?.items)
        ? product.items
        : product?.items
        ? [product.items]
        : [];

    useEffect(() => {
        if (itemsArray.length) {
            setQuantities(itemsArray.map(() => 1));
        }
    }, [product]);

    const handleQuantityChange = (index, value, maxQty) => {
        const newQuantities = [...quantities];
        const newValue = Math.max(1, Math.min(maxQty, parseInt(value || 1)));
        newQuantities[index] = newValue;
        setQuantities(newQuantities);
    };

    const totalCost = itemsArray.reduce((acc, item, idx) => {
        const latestPrice = item.priceHistory?.slice(-1)[0]?.price || 0;
        const qty = quantities[idx] || 1;
        return acc + latestPrice * qty;
    }, 0);

    const handleConfirm = async () => {
        const orderItems = itemsArray.map((item, idx) => {
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
            status: 'pending',
            createdAt: new Date(),
        };

        try {
            const res = await axiosSecure.post('/orders', orderData);
            if (res.data?.insertedId) {
                //    toast.success('✅ Order placed successfully!');
                onClose();

                // ✅ এখন ID সহ order পাঠাও PayNowModal এ
                setSelectedOrder({
                    ...orderData,
                    _id: res.data.insertedId,
                });
            } else {
                toast.error('❌ Order failed to save!');
            }
        } catch (err) {
            console.error(err);
            toast.error('❌ Something went wrong!');
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl rounded-xl   p-6 space-y-6 shadow-lg">
                        <DialogTitle className="text-2xl font-bold text-lime-600">
                            🛍️ Confirm Purchase from {product.market}
                        </DialogTitle>

                        <div className="space-y-4">
                            {itemsArray.map((item, index) => {
                                const latestPrice =
                                    item.priceHistory?.slice(-1)[0]?.price || 0;
                                const maxQty = parseInt(item.quantity || 1);

                                return (
                                    <div
                                        key={index}
                                        className="border rounded-lg p-4 bg-gray-50 space-y-2"
                                    >
                                        <p className="font-semibold  ">
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
                                        <p className="text-sm  0">
                                            Available: {maxQty} kg
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <p>
                            <strong>Seller: </strong> {product?.seller?.name}
                        </p>

                        <div className="text-lg font-semibold text-right text-lime-700">
                            💰 Total: ৳{totalCost}
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="btn btn-outline"
                            >
                                ❌ Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="btn btn-primary"
                            >
                                ✅ Confirm Purchase
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Payment Modal আলাদা করে */}
        </>
    );
};

export default BuyProductModal;
