import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/products').then((res) => setProducts(res.data));
    }, [axiosSecure]);

    const handleApproval = (id, status) => {
        axiosSecure.patch(`/products/status/${id}`, { status }).then(() => {
            const updated = products.map((p) =>
                p._id === id ? { ...p, status } : p,
            );
            setProducts(updated);
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure to delete this product?')) {
            axiosSecure.delete(`/products/${id}`).then(() => {
                setProducts(products.filter((p) => p._id !== id));
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.vendorName}</td>
                                <td>{p.status}</td>
                                <td className="space-x-2">
                                    {p.status === 'pending' && (
                                        <>
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
                                                onClick={() =>
                                                    handleApproval(
                                                        p._id,
                                                        'rejected',
                                                    )
                                                }
                                                className="btn btn-sm btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="btn btn-sm btn-outline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProduct;
