import { Outlet } from "react-router-dom";
import DashboardContent from "../components/DashboardContent";

function Dashboard() {
    return (
        <DashboardContent>
            <Outlet />
        </DashboardContent>
    );
}

export default Dashboard;
