import { useState } from 'react';
import { BsFingerprint } from 'react-icons/bs';
import { FaBookmark } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import MenuItem from './MenuItem';
const CustomerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <MenuItem
                icon={BsFingerprint}
                label="My Orders"
                address="my-orders"
            />
            <MenuItem icon={FaBookmark} label="Watchlist" address="watchlist" />
            <MenuItem
                icon={FaArrowTrendUp}
                label="Price Trends"
                address="price-trends"
            />

            {/* <div
              onClick={() => setIsOpen(true)}
              className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform    hover:bg-gray-300   hover:  cursor-pointer"
          >
              <GrUserAdmin className="w-5 h-5" />

              <span className="mx-4 font-medium">Become A Seller</span>
          </div>

          <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
        </>
    );
};

export default CustomerMenu;
