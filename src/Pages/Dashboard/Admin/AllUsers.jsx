import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UserDataRow from '../../../Component/Dashboard/TableRows/UserDataRow';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);

    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        enabled: !!axiosSecure,
        queryFn: async () => {
            const { data } = await axiosSecure.get('/allusers');
            return data;
        },
    });

    const handleSearch = async (e) => {
        const value = e.target.value;
        console.log(value);
        setSearchTerm(value);

        if (!value) return;

        try {
            setSearching(true);
            const res = await axiosSecure.get(`/searchUsers?search=${value}`);
            setUser(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };
    const displayedUsers = searchTerm && user.length > 0 ? user : users;

    if (isLoading) return <Loading />;

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <h2 className="text-2xl font-bold my-4">👥 All Users</h2>

                <input
                    type="text"
                    name="value"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name or email..."
                    className="w-full p-2 border border-gray-300 rounded "
                />
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200 text-left text-sm uppercase font-semibold"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200 text-left text-sm uppercase font-semibold"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200 text-left text-sm uppercase font-semibold"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200 text-left text-sm uppercase font-semibold"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200text-left text-sm uppercase font-semibold"
                                        >
                                            Status
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3    border-b border-gray-200 text-left text-sm uppercase font-semibold"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUsers.map((user, index) => (
                                        <UserDataRow
                                            key={user?._id}
                                            user={user}
                                            index={index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllUsers;
