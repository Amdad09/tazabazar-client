import AdminStatistics from "../../../Component/Dashboard/Statistics/AdminStatistics"
import useRole from "../../../hooks/useRole"
import Loading from "../../../shared/Loading";
import MyOrders from "../Customer/MyOrders";
import MyProducts from "../Seller/MyProducts";
const Statistics = () => {
  const [role, isLoading] = useRole();
  if(isLoading) return <Loading/>
  return (
    <div>
      {role==='admin' && <AdminStatistics/>}
      {role==='customer' && <MyOrders/>}
      {role==='seller' && <MyProducts/>}
    </div>
  )
}

export default Statistics
