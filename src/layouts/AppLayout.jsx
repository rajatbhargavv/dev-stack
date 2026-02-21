import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Box } from '@mui/material'

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
