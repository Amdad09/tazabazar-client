import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { RiAdvertisementFill } from 'react-icons/ri';
import { BiPurchaseTag } from 'react-icons/bi';
const AdminMenu = () => {
  return (
      <>
          <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
          <MenuItem icon={BiPurchaseTag} label="All Orders" address="all-orders" />
          <MenuItem icon={MdOutlineProductionQuantityLimits} label="All Products" address="all-products" />
          
          <MenuItem
              icon={RiAdvertisementFill}
              label="All Advertisement"
              address="all-advertisements"
          />
          <MenuItem
              icon={FaUserCog}
              label="All Users"
              address="manage-users"
          />
      </>
  );
}

export default AdminMenu
