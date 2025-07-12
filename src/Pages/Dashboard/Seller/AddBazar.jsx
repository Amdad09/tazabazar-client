import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AddBazarForm from '../../../Component/Form/AddBazarForm';
import { imageUpload } from '../../../assets/api/utils';
import useAuth from '../../../hooks/useAuth';

const AddBazar = () => {
    const { user } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(false);

    const handleFormSubmit = async (data, form) => {
        try {
            setIsUploading(true);

            // Attach seller info here
            const bazarData = {
                ...data,
                seller: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'user@example.com',
                    image: user?.photoURL || '',
                },
            };

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/add-market`,
                bazarData,
            );

            toast.success('✅ Bazar data added successfully!');

            // form.reset();
            setUploadedImage(null);
            console.log(res.data);
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to submit Bazar data.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        try {
            const imageUrl = await imageUpload(image);
            setUploadedImage(imageUrl);
            setImageUploadError(false);
        } catch (err) {
            setImageUploadError('Image Upload Failed!');
            console.log(err);
        }
    };

    return (
        <div>
            <AddBazarForm
                handleFormSubmit={handleFormSubmit}
                isUploading={isUploading}
                uploadedImage={uploadedImage}
                handleImageUpload={handleImageUpload}
                imageUploadError={imageUploadError}
            />
        </div>
    );
};

export default AddBazar;
