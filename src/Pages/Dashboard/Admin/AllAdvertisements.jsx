import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

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
                toast.success('Advertisement product added!');
            })
            .catch((error) => {
                console.error('Status update failed:', error);
            });

    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/advertisements/${id}`).then(() => {
                    setAds(ads.filter((ad) => ad._id !== id));
                });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
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
                                <td>{ad.adTitle}</td>
                                <td>{ad.status}</td>
                                <td>{ad.vendorName}</td>
                                <td>
                                    <div className="flex gap-3">
                                        {ad.status === 'pending' && (
                                            <button
                                                onClick={() =>
                                                    toggleStatus(
                                                        ad._id,
                                                        ad.status,
                                                    )
                                                }
                                                className="btn btn-xs md:btn-sm btn-success mr-2"
                                            >
                                                Approve
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(ad._id)}
                                            className="btn btn-xs md:btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
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
