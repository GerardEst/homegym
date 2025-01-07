import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import Calendar from './pages/Calendar';
import Workouts from './pages/Workouts';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<div className="p-6">Profile page (coming soon)</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;