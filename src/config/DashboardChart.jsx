import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import img1 from "../assets/div.MuiBox-root.png";
import img2 from "../assets/iconly-glass-discount.svg.png";
import img3 from "../assets/div.MuiBox-root (1).png";

const data = [
  { month: "Jan", revenue: 10 },
  { month: "Feb", revenue: 5 },
  { month: "Mar", revenue: 15 },
  { month: "Apr", revenue: 10 },
  { month: "May", revenue: 35 },
  { month: "Jun", revenue: 30 },
  { month: "Jul", revenue: 35 },
  { month: "Aug", revenue: 45 },
  { month: "Sep", revenue: 40 },
  { month: "Oct", revenue: 25 },
  { month: "Nov", revenue: 25 },
  { month: "Dec", revenue: 32 },
];

const DashboardChart = () => {
  return (
    <div className="p-6  w-[65%] border border-gray-400 shadow-gray-50 transition-all duration-1000 ease-in-out dark:bg-[linear-gradient(45deg,#000000_20%,#2563EB_100%)] dark:bg-cover dark:bg-no-repeat dark:bg-fixed bg-[white] dark:text-white text-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Stats */}
      <div className="flex gap-4 justify-around mb-6">
        <div className="flex gap-10 p-4 bg-red-100 rounded-lg text-red-700">
          <img className="w-[50px]" src={img1} alt="" />
          <div>
            <p className="text-sm">Sales</p>
            <p className="text-xl font-bold">$152k</p>
          </div>
        </div>
        <div className="flex gap-4 p-4 bg-yellow-100 rounded-lg text-yellow-700">
          <img className="w-[50px]" src={img2} alt="" />
          <div>
            <p className="text-sm">Cost</p>
            <p className="text-xl font-bold">$99.7k</p>
          </div>
        </div>
        <div className="flex gap-4   p-4 bg-green-100 rounded-lg text-green-700">
            <img className="w-[50px]" src={img3} alt="" />
          <div>
          <p className="text-sm">Profit</p>
          <p className="text-xl font-bold">$32.1k</p>
         </div>  
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
