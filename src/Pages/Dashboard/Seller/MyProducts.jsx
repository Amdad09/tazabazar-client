import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const MyProducts = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const limit = 8;

    // React Query v5 এর queryFn async function
    const fetchProducts = async ({ queryKey }) => {
        const [_key, currentPage] = queryKey;
        const res = await axiosSecure.get(
            `/my-products?page=${currentPage}&limit=${limit}`,
        );
        return res.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['my-products', page],
        queryFn: fetchProducts,
        keepPreviousData: true,
    });
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const products = data?.products || [];

    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/markets/${id}`),
        onSuccess: () => {
            toast.success('Product deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['my-products'] });
        },
        onError: () => {
            toast.error('Failed to delete product');
        },
    });

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
                deleteMutation.mutate(id);
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/dashboard/add-market/${id}`);
    };

    if (isLoading) return <Loading />;

    if (error) return <p className="text-red-500">Error loading products</p>;

    return (
        <div className="p-2 md:p-4 lg:p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold text-center py-6 text-primary">
                📦 My Products
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Item</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Market</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Details</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-6 text-gray-500"
                                >
                                    ❌ No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, idx) => {
                                const item = product.items;
                                if (!item?.name) return null;

                                return (
                                    <tr
                                        key={product._id || idx}
                                        className="transition-transform duration-500 hover:scale-[1.01] hover:shadow-sm"
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={product.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.unitPrice}৳/Kg
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.market}
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(
                                                product.date,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                title={
                                                    product.status ===
                                                        'rejected' &&
                                                    'If you want to see reject feedback, then click on the view details button'
                                                }
                                                className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${
                                                    product.status === 'pending'
                                                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-300'
                                                        : product.status ===
                                                          'approved'
                                                        ? 'bg-green-50 text-green-700 border border-green-300'
                                                        : 'bg-red-50 text-red-700 border border-red-300'
                                                }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={`/market/${product._id}`}>
                                                <button className="btn btn-sm bg-gray-400 border-primary">
                                                    Details
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="">
                                            <button
                                                onClick={() =>
                                                    handleUpdate(product._id)
                                                }
                                                className="px-3 py-1 mr-3 text-xs rounded text-primary border cursor-pointer border-blue-200 hover:bg-blue-50 transition"
                                                title="Edit Product"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product._id)
                                                }
                                                className="px-3 py-1 text-xs rounded cursor-pointer text-red-600 border border-red-200 hover:bg-red-50 transition"
                                                title="Delete Product"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
                        <button
                            className="btn btn-sm"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPage(idx + 1)}
                                className={`btn btn-sm ${
                                    page === idx + 1
                                        ? 'btn-primary'
                                        : 'btn-outline'
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        <button
                            className="btn btn-sm"
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
