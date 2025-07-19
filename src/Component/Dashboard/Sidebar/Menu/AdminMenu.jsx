import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'

const AdminMenu = () => {
  return (
      <>
          <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
          <MenuItem icon={FaUserCog} label="All Orders" address="all-orders" />
          <MenuItem icon={FaUserCog} label="All Products" address="all-products" />
          
          <MenuItem
              icon={FaUserCog}
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
