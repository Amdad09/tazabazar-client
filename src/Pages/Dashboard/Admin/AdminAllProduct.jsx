import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../shared/Loading';
import RejectionModal from '../../../Component/Modal/RejectionModal';
import { Link } from 'react-router';

const AdminAllProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentRejectId, setCurrentRejectId] = useState(null);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/markets').then((res) => setProducts(res.data))
            .finally(() => setLoading(false))
    }, [axiosSecure]);

    console.log(products)

    const handleApproval = (id, status) => {
        axiosSecure.patch(`/markets/status/${id}`, { status }).then(() => {
            const updated = products.map((p) =>
                p._id === id ? { ...p, status } : p,
            );
            setProducts(updated);
        });
    };

    const handleRejection = (feedback) => {
        axiosSecure
            .patch(`/markets/status/${currentRejectId}`, {
                status: 'rejected',
                feedback,
            })
            .then(() => {
                const updated = products.map((p) =>
                    p._id === currentRejectId
                        ? { ...p, status: 'rejected', feedback }
                        : p,
                );
                setProducts(updated);
                setShowModal(false);
            });
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/markets/${id}`).then(() => {
                    setProducts(products.filter((p) => p._id !== id));

                    Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success',
                    );
                });
            }
        });
    };

    if(loading) return <Loading/>

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Vendor</th>
                            <th>Details</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>{p.items.name}</td>
                                <td>{p.seller.name}</td>
                                <td>{p.status}</td>
                                <td>
                                    <Link to={`/market/${p._id}`}>
                                        <button className="btn btn-xs md:btn-sm bg-gray-400 border-primary">
                                            Details
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center">
                                        {/* Conditional Buttons */}
                                        {p.status === 'pending' && (
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleApproval(
                                                            p._id,
                                                            'approved',
                                                        )
                                                    }
                                                    className="btn btn-sm btn-success"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setCurrentRejectId(
                                                            p._id,
                                                        );
                                                        setShowModal(true);
                                                    }}
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="btn-xs md:btn-sm px-2 py-1 text-xs rounded cursor-pointer text-red-600 border border-red-200 hover:bg-red-50 transition"
                                            title="Delete Product"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <RejectionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleRejection}
            />
        </div>
    );
};

export default AdminAllProduct;
