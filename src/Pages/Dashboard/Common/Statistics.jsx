import AdminStatistics from "../../../Component/Dashboard/Statistics/AdminStatistics"
import useRole from "../../../hooks/useRole"
import Loading from "../../../shared/Loading";
const Statistics = () => {
  const [role, isLoading] = useRole();
  if(isLoading) return <Loading/>
  return (
    <div>
      {role==='admin' && <AdminStatistics/>}
    </div>
  )
}

export default Statistics
