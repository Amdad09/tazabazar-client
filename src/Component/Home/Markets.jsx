import { useLoaderData } from 'react-router';
import Container from '../Shared/Container';
import EmptyState from '../Shared/EmptyState';
import Card from './Card';

const Markets = () => {
    const markets = useLoaderData();

    return (
        <Container>
            {markets && markets.length > 0 ? (
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {markets.map((market) => (
                        <Card key={market._id} market={market} />
                    ))}
                </div>
            ) : (
                <EmptyState message="No market data available right now!" />
            )}
        </Container>
    );
};

export default Markets;
