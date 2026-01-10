import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { PageLoader } from './components/ui/PageLoader';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PropertyDetail from './pages/PropertyDetail';
import MyListings from './pages/SellerDashboard/MyListings';
import CreateListing from './pages/SellerDashboard/CreateListing';
import Messages from './pages/SellerDashboard/Messages';
import Analytics from './pages/SellerDashboard/Analytics';



function App() {
  return (
    <Router>
      <PageLoader />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MyListings />} />
          <Route path="create" element={<CreateListing />} />
          <Route path="messages" element={<Messages />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
