import React from 'react';
import Banner from '../Banner/Banner';
import ProductSection from '../ProductSection/ProductSection';
import MarketInsights from '../MarketInsights/MarketInsights';
import FAQ from '../Faq/Faq';

const Home = () => {
    return (
        <div>
            <Banner />
            <ProductSection />
            <MarketInsights />
            <FAQ/>
        </div>
    );
};

export default Home;