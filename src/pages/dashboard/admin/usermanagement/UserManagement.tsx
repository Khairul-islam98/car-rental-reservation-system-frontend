import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { columns } from "./datatable/columns/Columns";
import DataTable from "./datatable/DataTable";
import AddUser from "./adduser/AddUser";
import Loader from "@/components/Loader";

const UserManagement = () => {
  const { data, refetch, isLoading } = useGetAllUserQuery({});


  if(isLoading) return <Loader />

  return (
    <div>
      <AddUser refetch={refetch} />
      <p className="flex justify-end font-semibold mb-4">
        Total products: {data?.data?.length}
      </p>
      <DataTable columns={columns} data={data?.data} />
    </div>
  );
};

export default UserManagement;
