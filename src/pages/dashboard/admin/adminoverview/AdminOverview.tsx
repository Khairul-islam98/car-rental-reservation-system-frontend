// AdminOverview.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import { useGetAdminDashboardCountQuery } from '@/redux/features/booking/bookingApi';
import StatCard from '@/components/StatCard';
import { FaCalendarAlt, FaCar, FaDollarSign } from 'react-icons/fa';
import { ApexOptions } from 'apexcharts';
import Loader from '@/components/Loader';



const AdminOverview: React.FC = () => {
  const { data, isLoading } = useGetAdminDashboardCountQuery({});

  // Bar Chart Options and Series
  const barChartOptions: ApexOptions = {
    chart: {
      id: 'dashboard-bar-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    },
    title: {
      text: 'Monthly Revenue',
      align: 'left'
    },
    colors: ['#FEA633'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val}`
      }
    }
  };

  const barChartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70] // Replace with actual data
    }
  ];

  if (isLoading) return <Loader />

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <p className="text-3xl font-bold">Admin Dashboard</p>
      </header>
      <main>
        <section className="mb-6">
          <h1 className="text-2xl font-semibold">Welcome <span className='animate-waving-hand'>👋</span></h1>
          <p className="text-gray-700">Start the day with managing new appointments</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard 
            type="totalBookings"
            count={data?.data?.totalBookings}
            label="Total Bookings"
            icon={<FaCalendarAlt />}
          />
          <StatCard 
            type="totalAvailableCars"
            count={data?.data?.totalAvailableCars}
            label="Total Available Cars"
            icon={<FaCar />}
          />
          <StatCard 
            type="totalRevenue"
            count={data?.data?.totalRevenue}
            label="Total Revenue"
            icon={<FaDollarSign />}
          />
        </section>

        <section className="chart-section mt-10">
          <h2 className="text-2xl font-bold mb-4">Revenue Overview</h2>
          <div className="chart-container">
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height={350}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminOverview;
