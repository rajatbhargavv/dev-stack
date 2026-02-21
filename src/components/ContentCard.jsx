import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Typography, Box, Button, Stack, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import { loadUsers } from '../utils/storage'
import { formatDate } from '../utils/FormatDate'

const MotionCard = motion(Card)

const ContentCard = ({ id, title, content, authorId, publishedAt }) => {
  const { deleteContent } = useContent()
  const { currentUserId } = useAuth()

  const isOwner = currentUserId === authorId

  const users = loadUsers()
  const author = users.find((u) => u.id === authorId)
  const username = author?.email?.split('@')[0] || 'user'

  const previewContent = content.slice(0, 180)

  const handleDelete = (e) => {
    e.preventDefault()

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this content?'
    )

    if (!confirmDelete) return

    deleteContent(id, currentUserId)
  }

  return (
    <Link to={`/c/${id}`} style={{ textDecoration: 'none' }}>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          cursor: 'pointer'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 1 }}>
            {username.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary">
            @{username}
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight={600}>
          {title || 'Untitled'}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {previewContent}
          {content.length > 180 && '...'}
        </Typography>

        {publishedAt && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1 }}
          >
            Published: {formatDate(publishedAt)}
          </Typography>
        )}

        {isOwner && (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              size="small"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        )}
      </MotionCard>
    </Link>
  )
}

export default ContentCard
