import { useState } from 'react';

const AddBazarForm = ({
    handleFormSubmit,
    isUploading,
    uploadedImage,
    handleImageUpload,
    imageUploadError,
}) => {
    const [products, setProducts] = useState([
        {
            name: '',
            description: '',
            quantity: '',
            priceDate1: '',
            priceValue1: '',
            priceDate2: '',
            priceValue2: '',
            priceDate3: '',
            priceValue3: '',
        },
    ]);

    // 🟡 Handle change for each product input
    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    // ➕ Add new product row
    const addProduct = () => {
        setProducts([
            ...products,
            {
                name: '',
                description: '',
                quantity: '',
                priceDate1: '',
                priceValue1: '',
                priceDate2: '',
                priceValue2: '',
                priceDate3: '',
                priceValue3: '',
            },
        ]);
    };

    // ❌ Remove product row
    const removeProduct = (index) => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
    };

    // 🌿 Modified submit handler
    const handleFinalSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const market = form.market.value;
        const date = form.date.value;
        const marketDescription = form.marketDescription.value;

        // Prepare items with priceHistory array for each product
        const items = products.map((product) => {
            const priceHistory = [1, 2, 3].map((day) => ({
                date: product[`priceDate${day}`],
                price: product[`priceValue${day}`],
            }));

            return {
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                priceHistory,
            };
        });

        const data = {
            market,
            date,
            marketDescription,
            image: uploadedImage,
            status: 'pending',
            items,
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
                    <h3 className="text-xl font-semibold">🛒 Add Products</h3>
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-md space-y-4   shadow-sm"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <input
                                    type="text"
                                    placeholder="🥕 Item Name"
                                    required
                                    value={product.name}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    className="input input-bordered"
                                />
                                <input
                                    type="text"
                                    placeholder="📝 Description"
                                    value={product.description}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="input input-bordered"
                                />
                                <input
                                    type="text"
                                    placeholder="📦 Quantity"
                                    required
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            'quantity',
                                            e.target.value,
                                        )
                                    }
                                    className="input input-bordered"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeProduct(index)}
                                    className="btn btn-error text-white"
                                    disabled={products.length === 1}
                                >
                                    ❌ Remove
                                </button>
                            </div>

                            {/* 3 Days Price Entry */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((day) => (
                                    <div key={day} className="space-y-1">
                                        <label className="text-sm font-medium  ">
                                            📅 Day {day} Price
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={
                                                product[`priceDate${day}`] || ''
                                            }
                                            onChange={(e) =>
                                                handleProductChange(
                                                    index,
                                                    `priceDate${day}`,
                                                    e.target.value,
                                                )
                                            }
                                            className="input input-bordered"
                                        />
                                        <input
                                            type="number"
                                            placeholder="৳ Price"
                                            required
                                            value={
                                                product[`priceValue${day}`] ||
                                                ''
                                            }
                                            onChange={(e) =>
                                                handleProductChange(
                                                    index,
                                                    `priceValue${day}`,
                                                    e.target.value,
                                                )
                                            }
                                            className="input input-bordered"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addProduct}
                        className="btn btn-outline btn-primary"
                    >
                        ➕ Add Another Item
                    </button>
                </div>

                {/* 🖼️ Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium   mb-1">
                        🖼️ Upload Banner Image{' '}
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-lime-400 rounded-lg cursor-pointer   hover:bg-lime-50 transition duration-300 relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                        />
                        {!uploadedImage ? (
                            <div className="flex flex-col items-center  0">
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

                {/* ✅ Submit */}
                <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary w-full"
                >
                    {isUploading ? 'Saving...' : '✅ Save Bazar Info'}
                </button>
            </form>
        </div>
    );
};

export default AddBazarForm;
