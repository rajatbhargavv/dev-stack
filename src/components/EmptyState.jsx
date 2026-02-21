import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const EmptyState = ({ title, description, buttonText, buttonLink }) => {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>

        <Typography color="text.secondary">
          {description}
        </Typography>

        {buttonText && buttonLink && (
          <Button
            component={Link}
            to={buttonLink}
            variant="contained"
          >
            {buttonText}
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default EmptyState
