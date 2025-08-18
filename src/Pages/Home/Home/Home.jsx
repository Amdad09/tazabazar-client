import React from 'react';
import Banner from '../Banner/Banner';
import ProductSection from '../ProductSection/ProductSection';
import MarketInsights from '../MarketInsights/MarketInsights';
import FAQ from '../Faq/Faq';
import Advertisement from '../Advertisement/Advertisement';
import MarketDetails from '../MarketDetails/MarketDetails';
import VendorFeatures from '../VendorFeatures/VendorFeatures';
import UserReviews from '../UserReviews/UserReviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <ProductSection />
            <Advertisement/>
            <MarketInsights />
            <MarketDetails />
            <VendorFeatures/>
            <FAQ />
            <UserReviews/>
        </div>
    );
};

export default Home;