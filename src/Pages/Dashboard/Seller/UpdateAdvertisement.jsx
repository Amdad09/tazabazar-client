import { Navigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddAdvertisement from './AddAdvertisement';
import Loading from '../../../shared/Loading';

const UpdateAdvertisement = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [adData, setAdData] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/advertisements/${id}`).then((res) => {
            setAdData(res.data);
        });
    }, [id, axiosSecure]);

    const handleUpdate = async (updatedAd) => {
        try {
            await axiosSecure.put(`/advertisements/${id}`, updatedAd);
            Navigate('/dashboard/my-advertisement');
        } catch (err) {
            toast.error('Update failed.');
        }
    };

    if (!adData) return <Loading/>;

    return (
        <AddAdvertisement
            isUpdate
            defaultValues={adData}
            onSubmit={handleUpdate}
        />
    );
};

export default UpdateAdvertisement;
