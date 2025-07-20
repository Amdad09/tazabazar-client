import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AddMarketForm from './AddMarketForm';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProductForm = () => {
    const [productData, setProductData] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axiosSecure
            .get(`/market/${id}`)
            .then((res) => setProductData(res.data))
            .catch(() => toast.error('Failed to load product data'));
    }, [id, axiosSecure]);

    const handleUpdate = async (updatedData) => {
        try {
            await axiosSecure.put(`/market/${id}`, updatedData);
            toast.success('Product updated successfully');
            navigate('/dashboard/my-products');
        } catch {
            toast.error('Failed to update product');
        }
    };

    if (!productData) return <p>Loading...</p>;

    return (
        <AddMarketForm
            initialData={productData}
            isEditMode
            onSubmit={handleUpdate}
        />
    );
};

export default UpdateProductForm;
