import { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddAdvertisement = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        status: 'pending',
    });
    const axiosSecure = useAxiosSecure();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageUpload = async (e) => {
        // তোমার image upload logic (upload to server or external host)
        // setFormData({...formData, image: uploadedImageUrl})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/advertisements', formData);
            toast.success('Advertisement added successfully');
            setFormData({
                title: '',
                description: '',
                image: '',
                status: 'pending',
            });
        } catch {
            toast.error('Failed to add advertisement');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-lg mx-auto p-4"
        >
            <input
                type="text"
                name="title"
                placeholder="Ad Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
            />
            <textarea
                name="description"
                placeholder="Short description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
                Add Advertisement
            </button>
        </form>
    );
};

export default AddAdvertisement;
