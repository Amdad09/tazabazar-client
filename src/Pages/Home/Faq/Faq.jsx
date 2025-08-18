// components/FAQ.jsx

const FAQ = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 py-12" id="faq">
            <h2
                className="text-3xl font-bold text-center mb-10"
                data-aos="fade-up"
            >
                ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                <div className="collapse collapse-arrow bg-card shadow-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold text-primary">
                        🛒 How are the prices collected?
                    </div>
                    <div className="collapse-content  ">
                        <p>
                            Prices are submitted by local vendors and verified
                            by our review system before approval.
                        </p>
                    </div>
                </div>

                <div
                    className="collapse collapse-arrow bg-card shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold text-primary">
                        📆 How often is the data updated?
                    </div>
                    <div className="collapse-content  ">
                        <p>
                            Data is updated daily by vendors for the most
                            accurate pricing.
                        </p>
                    </div>
                </div>

                <div
                    className="collapse collapse-arrow bg-card shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold text-primary">
                        🔐 Do I need to log in to view details?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Yes. You need to log in to access full market data
                            and features like watchlist, orders, and reviews.
                        </p>
                    </div>
                </div>

                <div
                    className="collapse collapse-arrow bg-card shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold text-primary">
                        🧑‍🌾 How can I become a vendor?
                    </div>
                    <div className="collapse-content  ">
                        <p>
                            Just sign up and select the "Vendor" role. After
                            admin approval, you can submit daily market updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
