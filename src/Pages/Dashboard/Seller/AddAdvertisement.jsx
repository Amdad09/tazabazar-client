import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { imageUpload } from '../../../assets/api/utils';

const AddAdvertisementForm = ({isUpdate, defaultValues ={}, onSubmit }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [myProducts, setMyProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');

    const [formData, setFormData] = useState({
        adTitle: '',
        shortDescription: '',
        productId: '',
        productTitle: '',
    });

    // ✅ Load user's products
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/my-products`)
                .then((res) => setMyProducts(res.data.products))
                .catch((err) => console.error(err));
        }
    }, [user, axiosSecure]);


    useEffect(() => {
        if (isUpdate && defaultValues) {
            setFormData({
                adTitle: defaultValues.adTitle || '',
                shortDescription: defaultValues.shortDescription || '',
                productId: defaultValues.productId || '',
                productMarket: defaultValues.productMarket || '',
                productTitle: defaultValues.productTitle || '',
                productName: defaultValues.productName || '',
            });
            setImageUrl(defaultValues.image || '');
        }
    }, [isUpdate, defaultValues]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newAd = {
            ...formData,
            image: imageUrl,
            vendorName: user.displayName,
            vendorEmail: user.email,
            status: 'pending',
            createdAt: new Date(),
        };

        try {
            if (isUpdate && onSubmit) {
                await onSubmit(newAd); // For update mode
                toast.success(' Advertisement updated successfully!');
            } else {
                const res = await axiosSecure.post('/advertisements', newAd); // For add mode
                if (res.data.insertedId) {
                    toast.success(' Advertisement submitted successfully!');
                    setFormData({
                        adTitle: '',
                        shortDescription: '',
                        productId: '',
                        productTitle: '',
                        productMarket: '',
                        productName: '',
                    });
                    setImageUrl('');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('❌ Submission failed.');
        } finally {
            setIsSubmitting(false);
        }
    };



    // ✅ Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Product select handler
    const handleProductSelect = (e) => {
        const selectedId = e.target.value;
        const selectedProduct = myProducts.find((p) => p._id === selectedId);

        if (selectedProduct) {
            setFormData((prev) => ({
                ...prev,
                productId: selectedProduct._id,
                productMarket: selectedProduct.market,
                productName: selectedProduct.items.name,
                productTitle:
                    selectedProduct.items?.name || selectedProduct.name,
            }));
        }
    };

    // ✅ Image upload handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        try {
            const uploaded = await imageUpload(file);
            setImageUrl(uploaded);
            setImageUploadError('');
        } catch (err) {
            setImageUploadError('❌ Image upload failed!');
            console.error(err);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                📢 Add Advertisement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="adTitle"
                    value={formData.adTitle}
                    onChange={handleChange}
                    placeholder="🎯 Ad Title"
                    required
                    className="input input-bordered w-full"
                />

                <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="📝 Short Description"
                    required
                    className="textarea textarea-bordered w-full"
                />

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        🖼️ Upload Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-lime-400 rounded-lg cursor-pointer bg-white hover:bg-lime-50 transition duration-300 relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                        />
                        {!imageUrl ? (
                            <div className="text-gray-500 text-sm">
                                Click or drag & drop to upload image
                            </div>
                        ) : (
                            <img
                                src={imageUrl}
                                alt="Uploaded"
                                className="w-[150px] h-[100px] object-cover rounded-md"
                            />
                        )}
                    </div>
                    {imageUploadError && (
                        <p className="text-red-500 text-sm font-medium">
                            {imageUploadError}
                        </p>
                    )}
                </div>

                {/* Product Selection */}
                <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleProductSelect}
                    required
                    className="select select-bordered w-full"
                >
                    <option value="">📦 Select Product</option>
                    {myProducts.map((product) => (
                        <option key={product._id} value={product._id}>
                            {product.items?.name || product.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-success w-full"
                >
                    {isSubmitting
                        ? isUpdate
                            ? 'Updating...'
                            : 'Submitting...'
                        : isUpdate
                        ? '✏️ Update Advertisement'
                        : '✅ Submit Advertisement'}
                </button>
            </form>
        </div>
    );
};

export default AddAdvertisementForm;
