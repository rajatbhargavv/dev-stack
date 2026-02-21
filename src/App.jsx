import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import AppLayout from './layouts/AppLayout'
import HomePageFeed from './pages/HomeFeedPage'
import ContentPage from './pages/ContentPage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme/theme'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                {/* Public routes */}
                <Route path="/" element={<HomePageFeed />} />
                <Route path="/c/:id" element={<ContentPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/u/:userId" element={<ProfilePage />} />

                {/* Private routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/editor"
                  element={
                    <PrivateRoute>
                      <EditorPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/editor/:id"
                  element={
                    <PrivateRoute>
                      <EditorPage />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
