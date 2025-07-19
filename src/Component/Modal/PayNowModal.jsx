
import axios from 'axios';
import { toast } from 'react-hot-toast';
import StripeProvider from '../../context/StripeProvider';
import PaymentForm from '../Form/PaymentForm ';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PayNowModal = ({ isOpen, onClose, order, onPaymentUpdate }) => {
    const axiosSecure = useAxiosSecure();
    if (!isOpen) return null;

    // Payment success হলে order.status update
    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            const res = await axios.patch(
                `http://localhost:3000/orders/${order._id}`,
                {
                    transactionId: paymentIntent.id,
                },
            );
            if (res.data.modifiedCount > 0) {
                toast.success('✅ Payment Successful!');
                onPaymentUpdate?.(order._id);
            } else {
                toast.error('❌ Payment done, but order not updated.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status.');
        } finally {
            onClose(); // modal close করো
        }
    };

    // payment success হলে:
    // const handlePaymentSuccess = async () => {
    //     try {
    //         const res = await axiosSecure.post('/orders', order);
    //         if (res.data.insertedId) {
    //             toast.success('✅ Order placed & paid successfully!');
    //             onClose(); // modal বন্ধ করো
    //         } else {
    //             toast.error('❌ Order saving failed after payment!');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('❌ Error saving order after payment!');
    //     } finally {
    //         onClose(); // modal close করো
    //     }
    // };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    Pay for {order.market}
                </h2>

                <StripeProvider>
                    <PaymentForm
                        amount={order.totalPrice}
                        onPaymentSuccess={handlePaymentSuccess}
                    />
                </StripeProvider>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mt-4 btn text-sm bg-red-500 text-white cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayNowModal;
