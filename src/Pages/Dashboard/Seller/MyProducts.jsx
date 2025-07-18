import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const MyProducts = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-products');
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/products/${id}`);
        },
        onSuccess: () => {
            toast.success('Product deleted successfully');
            queryClient.invalidateQueries(['my-products']);
        },
        onError: () => {
            toast.error('Failed to delete product');
        },
    });


    const handleDelete = (id) => {
        if (!window.confirm('Are you sure to delete this product?')) return;
        deleteMutation.mutate(id);
    };

    const handleUpdate = (id) => {
        navigate(`/update-product/${id}`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">My Products</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">
                            Item Name
                        </th>
                        <th className="border border-gray-300 p-2">
                            Price per Unit
                        </th>
                        <th className="border border-gray-300 p-2">
                            Market Name
                        </th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center p-4">
                                No products found.
                            </td>
                        </tr>
                    )}

                    {products.map((product) =>
                        product.items?.length > 0 ? (
                            product.items.map((item, idx) => (
                                <tr key={item._id || idx}>
                                    <td className="border border-gray-300 p-2">
                                        {item.name}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {item?.unitPrice}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {product.market}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {new Date(
                                            product.date,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {product.status}
                                    </td>
                                    <td className="border border-gray-300 p-2 space-x-2">
                                        {/* Actions */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr key={product._id}>
                                <td colSpan={6} className="text-center p-4">
                                    No items found
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;
