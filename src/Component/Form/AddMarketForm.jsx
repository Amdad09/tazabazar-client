import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const AddMarketForm = ({
    handleFormSubmit,
    isUploading,
    uploadedImage,
    handleImageUpload,
    imageUploadError,
    initialData = {},
    onSubmit
}) => {
    const { user } = useAuth();
    const [itemName, setItemName] = useState(initialData?.items?.name || '');
    const [unitPrice, setUnitPrice] = useState(
        initialData?.items?.unitPrice || '',
    );
    const [market, setMarket] = useState(initialData?.market || '');
    const [date, setDate] = useState(initialData?.date?.slice(0, 10) || '');
    const [image, setImage] = useState(initialData?.image || '');
    const [product, setProduct] = useState(
        {
            name: '',
            description: '',
            quantity: '',
            unitPrice: '',
            priceHistory: Array(7).fill({ date: '', price: '' }),
        },
    );

    const handleProductChange = (field, value) => {
        setProduct({ ...product, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            items: {
                name: itemName,
                unitPrice: unitPrice,
            },
            market,
            date,
            image,
        };
        onSubmit(updatedProduct);
    };



    const handlePriceChange = (dayIndex, field, value) => {
        const updatedHistory = [...product.priceHistory];
        updatedHistory[dayIndex] = {
            ...updatedHistory[dayIndex],
            [field]: value,
        };
        setProduct({ ...product, priceHistory: updatedHistory });
    };


    // const addProduct = () => {
    //     setProducts([
    //         ...products,
    //         {
    //             name: '',
    //             description: '',
    //             quantity: '',
    //             unitPrice: '',
    //             productImage: '',
    //             priceHistory: Array(7).fill({ date: '', price: '' }),
    //             imageUploadError: '',
    //         },
    //     ]);
    // };


    // const removeProduct = (index) => {
    //     const updated = [...products];
    //     updated.splice(index, 1);
    //     setProducts(updated);
    // };

    
    const handleFinalSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const market = form.market.value;
        const date = form.date.value;
        const marketDescription = form.marketDescription.value;

        const data = {
            market,
            date,
            marketDescription,
            status: 'pending',
            image: uploadedImage,
            items: product,
            seller: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
            },
        };

        handleFormSubmit(data, form);
    };


    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
            <form
                onSubmit={handleFinalSubmit}
                className="w-full max-w-5xl space-y-8"
            >
                {/* 🏪 Market Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <input
                        type="text"
                        name="vendorEmail"
                        placeholder="📧 Vendor Email"
                        className="input input-bordered"
                        readOnly
                        defaultValue={user?.email}
                    />
                    <input
                        type="text"
                        name="vendorName"
                        placeholder="🧑‍🌾 Vendor Name"
                        className="input input-bordered"
                        defaultValue={user?.displayName}
                    />
                    <input
                        type="text"
                        name="market"
                        placeholder="🏪 Market Name"
                        required
                        className="input input-bordered"
                    />
                    <input
                        type="date"
                        name="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="marketDescription"
                        placeholder="📝 Market Description"
                        required
                        className="input input-bordered"
                    />
                </div>

                {/* 📦 Product Items */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">🛒 Add Product</h3>

                    <div className="border p-4 rounded-md space-y-4 bg-white shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                placeholder="🥕 Item Name"
                                required
                                value={product.name}
                                onChange={(e) =>
                                    handleProductChange('name', e.target.value)
                                }
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                placeholder="📝 Description"
                                value={product.description}
                                onChange={(e) =>
                                    handleProductChange(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                className="input input-bordered"
                            />
                            <input
                                type="number"
                                placeholder="📦 Weight (KG)"
                                required
                                value={product.quantity}
                                onChange={(e) =>
                                    handleProductChange(
                                        'quantity',
                                        e.target.value,
                                    )
                                }
                                className="input input-bordered"
                            />
                            <input
                                type="number"
                                placeholder="💵 Unit Price (TK)"
                                value={product.unitPrice}
                                onChange={(e) =>
                                    handleProductChange(
                                        'unitPrice',
                                        e.target.value,
                                    )
                                }
                                className="input input-bordered"
                            />
                        </div>

                        {/* 🖼️ Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                🖼️ Upload Banner Image{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-lime-400 rounded-lg cursor-pointer bg-white hover:bg-lime-50 transition duration-300 relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                />
                                {!uploadedImage ? (
                                    <div className="flex flex-col items-center text-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-10 h-10 mb-2 text-lime-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 16l4-4 4 4m4-4l4 4m-4-4v8"
                                            />
                                        </svg>
                                        <p className="text-sm">
                                            Click or drag & drop to upload image
                                        </p>
                                    </div>
                                ) : (
                                    <div className="w-[150px] h-[100px] overflow-hidden rounded-md">
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            {imageUploadError && (
                                <p className="text-red-500 text-sm font-medium">
                                    ⚠️ {imageUploadError}
                                </p>
                            )}
                        </div>

                        {/* 📊 Price History */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {product.priceHistory.map((entry, dayIndex) => (
                                <div key={dayIndex} className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">
                                        📅 Day {dayIndex + 1} Price
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={entry.date}
                                        onChange={(e) =>
                                            handlePriceChange(
                                                dayIndex,
                                                'date',
                                                e.target.value,
                                            )
                                        }
                                        className="input input-bordered"
                                    />
                                    <input
                                        type="number"
                                        placeholder="৳ Price"
                                        required
                                        value={entry.price}
                                        onChange={(e) =>
                                            handlePriceChange(
                                                dayIndex,
                                                'price',
                                                e.target.value,
                                            )
                                        }
                                        className="input input-bordered"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ✅ Submit */}
                <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-success w-full"
                >
                    {isUploading ? 'Saving...' : '✅ Save Bazar Info'}
                </button>
            </form>
        </div>
    );
};

export default AddMarketForm;
