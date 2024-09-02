/* eslint-disable @typescript-eslint/no-unused-vars */
// StatCard.tsx
import { FC } from "react";
// import { FaCalendarAlt, FaCar, FaDollarSign } from "react-icons/fa";

interface StatCardProps {
  type: "totalBookings" | "totalAvailableCars" | "totalRevenue";
  count: number | undefined;
  label: string;
  icon: JSX.Element;
}

const StatCard: FC<StatCardProps> = ({ count, label, icon }) => {
  return (
    <div className="stat-card bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-gray-200">
      <div className="icon bg-yellow-500 text-white p-4 rounded-full">
        {icon}
      </div>
      <div className="details">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-600">{count}</p>
      </div>
    </div>
  );
};

export default StatCard;
