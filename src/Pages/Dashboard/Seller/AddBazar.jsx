import { useState } from 'react';
import toast from 'react-hot-toast';
import AddMarketForm from '../../../Component/Form/AddMarketForm';
import { imageUpload } from '../../../assets/api/utils';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddBazar = () => {
    const { user } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleFormSubmit = async (data, form) => {
        try {
            setIsUploading(true);

            const res = await axiosSecure.post('/add-market', data);
            toast.success('✅ Bazar data added successfully!');
            // form.reset();
            setUploadedImage(null);
            // console.log(res.data);
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to submit Bazar data.');
        } finally {
            setIsUploading(false);
        }
    };

    // for check
    // fetch('https://kachabazar-360-server.vercel.app/jwt', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: user.email }),
    // });

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        try {
            const imageUrl = await imageUpload(image);
            console.log(imageUrl);
            setUploadedImage(imageUrl);
            setImageUploadError(false);
        } catch (err) {
            setImageUploadError('Image Upload Failed!');
            console.log(err);
        }
    };

    return (
        <div>
            {/* <AddBazarForm
                handleFormSubmit={handleFormSubmit}
                isUploading={isUploading}
                uploadedImage={uploadedImage}
                handleImageUpload={handleImageUpload}
                imageUploadError={imageUploadError}
            /> */}
            <AddMarketForm
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
