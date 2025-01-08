import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import Calendar from './pages/Calendar';
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import Workouts from './pages/Workouts';
import { useState, useEffect } from 'react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './lib/supabase'

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