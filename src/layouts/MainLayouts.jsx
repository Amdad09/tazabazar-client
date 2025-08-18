import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-16">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default MainLayouts;
