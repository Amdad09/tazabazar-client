import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAdvertisements = () => {
    const [ads, setAds] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/advertisements').then((res) => setAds(res.data));
    }, [axiosSecure]);

    const toggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        axiosSecure
            .patch(`/advertisements/${id}`, { status: newStatus })
            .then(() => {
                setAds(
                    ads.map((ad) =>
                        ad._id === id ? { ...ad, status: newStatus } : ad,
                    ),
                );
            });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure to delete this ad?')) {
            axiosSecure.delete(`/advertisements/${id}`).then(() => {
                setAds(ads.filter((ad) => ad._id !== id));
            });
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Vendor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad, index) => (
                            <tr key={ad._id}>
                                <td>{index + 1}</td>
                                <td>{ad.title}</td>
                                <td>{ad.status}</td>
                                <td>{ad.vendorName}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            toggleStatus(ad._id, ad.status)
                                        }
                                        className="btn btn-sm btn-info mr-2"
                                    >
                                        Toggle Status
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ad._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAdvertisements;
