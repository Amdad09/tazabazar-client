import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading';

const Offers = () => {

     const axiosSecure = useAxiosSecure();

     const { data: offers = [], isLoading } = useQuery({
         queryKey: ['all-advertisements'],
         queryFn: async () => {
             const res = await axiosSecure.get('/advertisements/active');
             console.log(res.data);
             return res.data;
         },
     });
     console.log(offers);

    if (isLoading) return <Loading />;

    return (
        <div className="my-12 pb-12 max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
                🛍️ Offers Highlights
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {offers.map((offer) => (
                    <div
                        key={offer._id}
                        className="rounded-2xl my-5 border border-green-300 shadow-lg px-2 p-2 md:p-4 bg-card text-secondary h-full flex flex-col justify-between items-center transition-all duration-500"
                    >
                        <h3 className="text-lg font-semibold text-green-700 dark:text-primary text-center">
                            {offer.adTitle}
                        </h3>
                        <p className="text-sm text-center">
                            {offer.shortDescription}
                        </p>
                        {offer.image && (
                            <img
                                src={offer.image}
                                alt={offer.adTitle}
                                className="w-full h-32 md:h-52 object-cover rounded-lg mt-3"
                            />
                        )}
                        <Link
                            to={`/market/${offer.productId}`}
                            className="mt-4 mb-2 btn btn-xs lg:btn-md bg-green-600 dark:bg-primary text-secondary hover:bg-green-700 dark:hover:bg-teal-800 border-none transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
