import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';

const usePagination = (url, queryKey, limit = 8) => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axiosSecure.get(
                    `${url}?page=${page}&limit=${limit}`,
                );
                // Parse totalCount to number safely
                const count = Number(res.data.totalCount);
                setData(res.data.products || []);
                setTotalCount(isNaN(count) ? 0 : count);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [page, url, limit]);

    // Use safe number for limit
    const safeLimit = Number(limit) || 8;
    const totalPages = Math.ceil(totalCount / safeLimit);

    return { data, page, setPage, totalPages, isLoading };
};

export default usePagination;
