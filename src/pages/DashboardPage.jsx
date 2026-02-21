import React from 'react'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import ContentCard from '../components/ContentCard'
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  Container
} from '@mui/material'

import EmptyState from '../components/EmptyState'


const DashboardPage = () => {
  const { content } = useContent()
  const { currentUserId } = useAuth()

  // UI state
  const [activeTab, setActiveTab] = React.useState('published')
  const [sortOrder, setSortOrder] = React.useState('newest')

  // filter content owned by user
  const myContent = content.filter(
    (item) => item.authorId === currentUserId
  )

  // filter by tab
  let visibleContent = myContent

  if (activeTab === 'draft') {
    visibleContent = myContent.filter(c => c.status === 'draft')
  } else if (activeTab === 'published') {
    visibleContent = myContent.filter(
      c => c.status === 'published' && c.visibility === 'public'
    )
  } else if (activeTab === 'private') {
    visibleContent = myContent.filter(
      c => c.status === 'published' && c.visibility === 'private'
    )
  }

  // sort after filtering
  visibleContent = [...visibleContent].sort((a, b) => {
    const dateA = a.updatedAt || a.createdAt
    const dateB = b.updatedAt || b.createdAt

    return sortOrder === 'newest'
      ? dateB - dateA
      : dateA - dateB
  })


  if (myContent.length === 0) {
  return (
    <EmptyState
      title="No content yet"
      description="Start writing your first post."
      buttonText="Create Content"
      buttonLink="/editor"
    />
  )
}


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Drafts" value="draft" />
            <Tab label="Published" value="published" />
            <Tab label="Private" value="private" />
          </Tabs>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight={600}>
            Your Content
          </Typography>

          <Select
            size="small"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
          </Select>
        </Stack>

        {visibleContent.length === 0 ? (
          <EmptyState
            title="Nothing here"
            description="No content in this section."
          />
        ) : (
          visibleContent.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              authorId={item.authorId}
              publishedAt={item.publishedAt || item.updatedAt}
            />
          ))
        )}
      </Stack>
    </Container>
  )
}

export default DashboardPage
