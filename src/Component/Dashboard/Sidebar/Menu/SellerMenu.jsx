import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BiSolidOffer } from 'react-icons/bi';
import { RiAdvertisementFill } from 'react-icons/ri';
import MenuItem from './MenuItem';
const SellerMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsFillHouseAddFill}
                label="Add Market"
                address="add-market"
            />

            <MenuItem
                icon={MdOutlineProductionQuantityLimits}
                label="My Products"
                address="my-products"
            />
            <MenuItem
                icon={RiAdvertisementFill}
                label="Add Advertisement"
                address="add-advertisement"
            />
            <MenuItem
                icon={BiSolidOffer}
                label="My Advertisement"
                address="my-advertisement"
            />

            {/* <MenuItem
                icon={MdOutlineManageHistory}
                label="Manage Orders"
                address="manage-orders"
            /> */}
        </>
    );
};

export default SellerMenu;
