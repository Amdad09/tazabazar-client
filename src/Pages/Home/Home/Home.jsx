import React from 'react';
import Banner from '../Banner/Banner';
import ProductSection from '../ProductSection/ProductSection';
import MarketInsights from '../MarketInsights/MarketInsights';
import FAQ from '../Faq/Faq';
import Advertisement from '../Advertisement/Advertisement';

const Home = () => {
    return (
        <div>
            <Banner />
            <ProductSection />
            <Advertisement/>
            <MarketInsights />
            <FAQ/>
        </div>
    );
};

export default Home;