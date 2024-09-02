import { useAppSelector } from "@/redux/hooks";
import AdminOverview from "./admin/adminoverview/AdminOverview";
import UserOverview from "./users/useroverview/UserOverview";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) return <Navigate to="/login" />;

    return (
        <div>
            {user.role === "admin" ? <AdminOverview /> : <UserOverview />}
        </div>
    );
};

export default Dashboard;