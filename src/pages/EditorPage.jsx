import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'

import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

const EditorPage = () => {
  const { id } = useParams()
  const { createContent, content, updateContent, publishContent } = useContent()
  const { currentUserId } = useAuth()
  const navigate = useNavigate()

  const isEditMode = Boolean(id)

  // local state
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const [type, setType] = React.useState('post')
  const [visibility, setVisibility] = React.useState('private')

  // find existing content
  const existingContent = isEditMode
    ? content.find((c) => c.id === id)
    : null

  // load existing content into form
  React.useEffect(() => {
    if (isEditMode && existingContent) {
      setTitle(existingContent.title || '')
      setBody(existingContent.content || '')
      setType(existingContent.type || 'post')
      setVisibility(existingContent.visibility || 'private')
    }
  }, [isEditMode, existingContent])

  // not found
  if (isEditMode && !existingContent) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Content not found</Typography>
        <Button component={Link} to="/dashboard" sx={{ mt: 2 }}>
          Go to Dashboard
        </Button>
      </Box>
    )
  }

  // not owner
  if (isEditMode && existingContent.authorId !== currentUserId) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          You don’t have access to this content.
        </Typography>
        <Button component={Link} to="/dashboard" sx={{ mt: 2 }}>
          Go to Dashboard
        </Button>
      </Box>
    )
  }

  // handlers
  const handleSaveDraft = () => {
    if (!isEditMode) {
      const result = createContent({
        title,
        content: body,
        type,
        authorId: currentUserId
      })

      if (result.success) {
        const newId = result.data[0].id
        navigate(`/editor/${newId}`)
      }
    } else {
      updateContent(id, currentUserId, {
        title,
        content: body,
        visibility
      })
    }
  }

  const handlePublish = () => {
    const result = publishContent(id, currentUserId, visibility)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  const isPublishDisabled = body.trim() === '' || (type === 'article' && title.trim() === '')

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        px: 2,
        py: 4
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          border: '1px solid #e0e0e0'
        }}
      >
        <Stack spacing={3}>
          {/* Header */}
          <Typography variant="h5" fontWeight={600}>
            {isEditMode ? 'Edit Content' : 'Create New Content'}
          </Typography>

          {/* Type selector */}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="post">Post</MenuItem>
              <MenuItem value="article">Article</MenuItem>
            </Select>
          </FormControl>

          {/* Title */}
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />

          {/* Body */}
          <TextField
            label="Write your content..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            minRows={8}
            fullWidth
            variant="outlined"
            autoFocus
          />

          {/* Visibility */}
          {isEditMode && (
            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select
                value={visibility}
                label="Visibility"
                onChange={(e) => setVisibility(e.target.value)}
              >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>

            {isEditMode && (
              <Button
                variant="contained"
                onClick={handlePublish}
                disabled={isPublishDisabled}
              >
                Publish
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EditorPage
