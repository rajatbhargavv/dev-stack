import React from 'react'
import { useParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useAuth } from '../context/AuthContext'
import { Box, Container, Typography, Stack } from '@mui/material'
import ContentCard from '../components/ContentCard'
import EmptyState from '../components/EmptyState'

const ProfilePage = () => {
  const { id } = useParams()          // profile user id
  const { content } = useContent()
  const { currentUserId } = useAuth()

  // determine whose profile we are viewing
  const profileUserId = id || currentUserId

  // get all content of this user
  const userContent = content.filter(
    (c) => c.authorId === profileUserId
  )

  // if user has no content at all
  if (userContent.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="This user hasn’t created any content."
      />
    )
  }

  // only public + published content
  const publicPosts = userContent.filter(
    (c) => c.status === 'published' && c.visibility === 'public'
  )

  // if no public posts
  if (publicPosts.length === 0) {
    return (
      <EmptyState
        title="No public posts"
        description="This user has not published anything publicly yet."
      />
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Profile
      </Typography>

      <Stack spacing={2}>
        {publicPosts.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            authorId={item.authorId}
            publishedAt={item.publishedAt}
          />
        ))}
      </Stack>
    </Container>
  )
}

export default ProfilePage
