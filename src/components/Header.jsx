import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from '@mui/material'

const Header = () => {
  const { isAuthenticated, logout, currentUserId } = useAuth()

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar sx={{ maxWidth: 1000, width: '100%', mx: 'auto' }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          DevStack
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              component={Link}
              to="/editor"
              variant="contained"
              sx={{ borderRadius: 5 }}
            >
              Create
            </Button>

            <Button component={Link} to="/dashboard">
              Dashboard
            </Button>

            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUserId?.slice(0, 2)}
            </Avatar>

            <Button color="error" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button component={Link} to="/login" variant="contained">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
