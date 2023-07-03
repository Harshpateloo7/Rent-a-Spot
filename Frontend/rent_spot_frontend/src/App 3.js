import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Layout, NoPage, Parking } from './pages';
import ParkingForm from './pages/ParkingForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Space from './pages/Space';
import SpaceForm from './pages/SpaceForm';
import BookingForm from './pages/BookingForm';
import Booking from './pages/Booking';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="parking" element={<Parking />} />
          <Route path="parkingForm" element={<ParkingForm />} />
          <Route path="space" element={<Space />} />
          <Route path="spaceForm" element={<SpaceForm />} />
          <Route path="bookingForm" element={<BookingForm />} />
          <Route path="booking" element={<Booking />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
