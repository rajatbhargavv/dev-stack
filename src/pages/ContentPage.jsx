import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Stack,
} from '@mui/material'
import { formatDate } from '../utils/FormatDate'

const ContentPage = () => {
  const { id } = useParams()
  const { content, deleteContent } = useContent()
  const { currentUserId } = useAuth()
  const navigate = useNavigate()

  if (!content.length) {
    return <Typography sx={{ mt: 4 }}>Loading...</Typography>
  }

  const currentContent = content.find((c) => c.id === id)

  if (!currentContent) {
    return (
      <Typography sx={{ mt: 4 }}>
        Content not found. <Link to="/">Go Home</Link>
      </Typography>
    )
  }
  
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this content?'
    )
    
    if (!confirmDelete) return
    
    const result = deleteContent(id, currentUserId)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  const isOwner = currentContent.authorId === currentUserId
  
  if (
    currentContent.visibility === 'private' &&
    currentContent.authorId !== currentUserId
  ) {
    return (
      <Typography>
        Private content. <Link to="/">Go Home</Link>
      </Typography>
    )
  }



  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 3, borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 1 }}>
            {currentContent.authorId.slice(0, 2)}
          </Avatar>
          <Typography color="text.secondary">
            @{currentContent.authorId}
          </Typography>
        </Box>
        <Typography>{formatDate(currentContent.publishedAt)}</Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {currentContent.title}
        </Typography>

        <Typography>
          {currentContent.content}
        </Typography>
        {isOwner && (
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Link to={`/editor/${id}`}>
              <Button variant="outlined">Edit</Button>
            </Link>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        )}

      </CardContent>
    </Card>
  )
}

export default ContentPage
