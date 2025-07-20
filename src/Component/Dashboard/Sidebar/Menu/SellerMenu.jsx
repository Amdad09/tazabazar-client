import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
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
                icon={MdHomeWork}
                label="My Products"
                address="my-products"
            />
            <MenuItem
                icon={MdHomeWork}
                label="Add Advertisement"
                address="add-advertisement"
            />
            <MenuItem
                icon={MdHomeWork}
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
