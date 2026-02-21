import React from 'react'
import { useContent } from '../context/ContentContext'
import ContentCard from '../components/ContentCard'
import { Box, Card, Typography, TextField } from '@mui/material'
import EmptyState from '../components/EmptyState'
import { motion } from 'framer-motion'

const HomeFeedPage = () => {
  const { content } = useContent()
  const [searchQuery, setSearchQuery] = React.useState('')

  // 🔥 Stagger animation container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const publicContent = content
    .filter(
      (c) => c.status === 'published' && c.visibility === 'public'
    )
    .filter((c) => {
      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase()

      const titleMatch = c.title?.toLowerCase().includes(query)
      const contentMatch = c.content?.toLowerCase().includes(query)
      const tagMatch = c.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      )

      return titleMatch || contentMatch || tagMatch
    })

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
        px: 2
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          borderRadius: 3
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Home Feed
        </Typography>

        <TextField
          fullWidth
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {publicContent.length === 0 ? (
            <EmptyState
              title="No results"
              description="Try searching something else."
            />
          ) : (
            publicContent.map((c) => (
              <ContentCard
                key={c.id}
                id={c.id}
                title={c.title}
                content={c.content}
                authorId={c.authorId}
                publishedAt={c.publishedAt}
              />
            ))
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default HomeFeedPage
