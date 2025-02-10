import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customers = lazy(() => import('@/pages/Customers'));
const CustomerDetail = lazy(() => import('@/pages/Customers/CustomerDetail'));
const ServicePoints = lazy(() => import('@/pages/ServicePoints'));
const Devices = lazy(() => import('@/pages/Devices'));
const ServiceOrders = lazy(() => import('@/pages/ServiceOrders'));
const Financial = lazy(() => import('@/pages/Financial'));

// Loading component
const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
    }}
  >
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />

        {/* Service Points */}
        <Route path="/service-points" element={<ServicePoints />} />

        {/* Devices */}
        <Route path="/devices" element={<Devices />} />

        {/* Service Orders */}
        <Route path="/service-orders" element={<ServiceOrders />} />

        {/* Financial */}
        <Route path="/financial" element={<Financial />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
