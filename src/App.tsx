import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import Calendar from './pages/Calendar';
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import Workouts from './pages/Workouts';
import { useState, useEffect } from 'react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://zlghndzyisetdyuozejv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZ2huZHp5aXNldGR5dW96ZWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzIxODAsImV4cCI6MjA1MTg0ODE4MH0.OdE8ppHJ0obos7WiPcSIUSpa-DkP9SFQIiYu0kgmh6I')

function App() {
  const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])
  
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
      />
    )
  } else {
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
}

export default App;