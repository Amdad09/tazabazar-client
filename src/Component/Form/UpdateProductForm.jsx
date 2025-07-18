import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import AddProductForm from './AddProductForm'; // ধরলাম তুমি একটা reusable form কম্পোনেন্ট বানিয়েছো

const UpdateProductForm = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const axios = axiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/products/${id}`)
            .then((res) => setProductData(res.data))
            .catch(() => toast.error('Failed to load product data'));
    }, [id]);

    const handleUpdate = async (updatedData) => {
        try {
            await axios.put(`/products/${id}`, updatedData);
            toast.success('Product updated successfully');
            navigate('/my-products');
        } catch {
            toast.error('Failed to update product');
        }
    };

    if (!productData) return <p>Loading...</p>;

    return <AddProductForm initialData={productData} onSubmit={handleUpdate} />;
};

export default UpdateProductForm;
