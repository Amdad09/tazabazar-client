import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../shared/Loading';
import { Link, Navigate, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyAdvertisements = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

  const {
      data: ads = [],
      isLoading,
      refetch,
  } = useQuery({
      queryKey: ['my-advertisement', user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
          const res = await axiosSecure.get(`/advertisements/myads?email=${user.email}`);
          return res.data;
      },
  });
    
   const deleteMutation = useMutation({
       mutationFn: async (id) => axiosSecure.delete(`/advertisements/${id}`),
       onSuccess: () => {
           toast.success('Product deleted successfully');
           queryClient.invalidateQueries({
               queryKey: ['my-advertisement', user?.email],
           });
       },
       onError: () => {
           toast.error('Failed to delete product');
       },
   });


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
                deleteMutation.mutate(id);
            }
        });
    };
    

    const handleUpdate = id => {
         navigate(`/dashboard/update-ad/${id}`);
    }
   
    

    if (isLoading) return <Loading />;

    
    
    // const totalCount = data?.totalCount || 0;
    // const totalPages = Math.ceil(totalCount / limit);
    console.log(ads)
    return (
        <div className="max-w-6xl mx-auto p-6  rounded">
            <h2 className="text-2xl text-center font-semibold md:font-bold mb-6 text-primary">
                📢 My Advertisements
            </h2>

            {ads.length === 0 ? (
                <p className="text-center text-gray-500">
                    No advertisements found.
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left rounded text-sm sm:text-base">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">
                                        Product
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Market
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Ad Title
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Details
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.map((ad) => (
                                    <tr
                                        key={ad._id}
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="px-4 py-2 font-medium">
                                            {ad.productName || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {ad.productMarket || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {ad.adTitle || 'N/A'}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/market/${ad.productId}`}
                                                className="btn btn-sm bg-gray-400 text-black text-xs rounded"
                                            >
                                                View Details
                                            </Link>
                                        </td>

                                        <td className="px-4 py-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-1">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-semibold text-center ${
                                                        ad.status === 'approved'
                                                            ? 'bg-green-200 text-green-800'
                                                            : ad.status ===
                                                              'rejected'
                                                            ? 'bg-red-200 text-red-800'
                                                            : 'bg-yellow-200 text-yellow-800'
                                                    }`}
                                                >
                                                    {ad.status}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handleUpdate(ad._id)
                                                    }
                                                    className="px-3 py-1 text-xs rounded text-primary border border-blue-200 hover:bg-blue-50 transition"
                                                    title="Edit Product"
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(ad._id)
                                                    }
                                                    className="px-3 py-1 text-xs rounded text-red-600 border border-red-200 hover:bg-red-50 transition"
                                                    title="Delete Product"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            {[...Array(totalPages).keys()].map((num) => (
                                <button
                                    key={num + 1}
                                    onClick={() => setPage(num + 1)}
                                    className={`px-4 py-2 rounded ${
                                        page === num + 1
                                            ? 'bg-lime-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {num + 1}
                                </button>
                            ))}
                        </div>
                    )} */}
                </>
            )}
        </div>
    );
};

export default MyAdvertisements;
