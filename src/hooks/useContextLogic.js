
export const createContent = (existingContentArray, inputs) => {
  const {title, authorId, content, type} = inputs // getting these from the inputs object
  
  if (!type) {
    return { success: false, error: 'INVALID_TYPE' }
  }

  const normalizedType = type.toLowerCase()

  if(!authorId) return {success: false, error : 'MISSING_AUTHOR'}
  if(!content || content.trim() === '') return {success: false, error: 'EMPTY_CONTENT'}
  if(normalizedType !== 'post' && normalizedType !== 'article') return {success: false, error: 'INVALID_TYPE'}
  if(title.trim() === '' && normalizedType === 'article') return {success: false, error: 'MISSING_TITLE'}


  const newContent = {
    authorId,
    title,
    content,
    type: normalizedType,
    id: Date.now().toString(),
    status: 'draft',
    visibility: 'private',
    tags: [],
    likedBy: [],
    bookmarkedBy: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    publishedAt: null 
  }
  const newContentArray = [newContent, ...existingContentArray] // setting this to the top of existing array
  return {
    success: true,
    data: newContentArray
  }
}

export const publishContent = (existingContentArray, contentId, userId, visibility) => {

  // GETTING THE EXACT CONTENT WE HAVE TO PUBLISH
  const content = existingContentArray.find(c => c.id === contentId)
  
  // CHECKING IF GENERALIZED VISIBILITY IS EMPTY
  if(!visibility || visibility.trim() === '') return {success: false, error: 'INVALID_VISIBILITY'} 

  // MAKING GENERALIZE VISIBILITY VALUE
  const generalizedVisibility = visibility.toLowerCase()


  // CHECKING ON ALL THE EDGE CASES
  if(!content) return {success: false, error: "NOT_FOUND"}
  if(content.authorId !== userId) return {success: false, error: "NOT_OWNER"}
  // if(content.status !== 'draft') return {success: false, error: "INVALID_STATE"}
  if(generalizedVisibility !== 'private' && generalizedVisibility !== 'public') return {success: false, error: "INVALID_VISIBILITY"}

  // PUBLISHING THE CONTENT
  const newContentArray = existingContentArray.map((cont)=>{
    if(cont.id === contentId){
      return {
        ...cont,
        publishedAt: Date.now(),
        updatedAt: Date.now(),
        visibility: generalizedVisibility,
        status: 'published'
      }
    }else return cont
  })

  return {
    success: true,
    data: newContentArray
  }
}

export const updateContent = (existingContentArray, contentId, userId, updates) => {
  const {title, content, visibility, tags} = updates

  // GENERALIZING VISIBILITY
  let generalizedVisibility
  if(visibility !== undefined){
    generalizedVisibility = visibility.toLowerCase()
    if(generalizedVisibility !== 'public' && generalizedVisibility !== 'private') return {success: false, error: 'INVALID_VISIBILITY'}
  }

  // FINDING THE CONTENT WE ARE LOOKING FOR
  const contentObj = existingContentArray.find((c) => c.id === contentId)
  
  // CHECKING FOR CONTENT 
  if (!contentObj) 
    return { success: false, error: 'NOT_FOUND' }

  // OWNERSHIP CHECK
  if(contentObj.authorId !== userId) 
    return {success: false, error: 'NOT_OWNER'}

  // MAKING A NEW UPDATED CONTENT
  const updatedContent = {
    ...contentObj,
    ...(title !== undefined && {title}),
    ...(content !== undefined && {content}),
    ...(tags !== undefined && {tags}),
    ...(generalizedVisibility !== undefined && {visibility: generalizedVisibility}),
    updatedAt: Date.now()
  }

  // CHECKING FOR ARTICLE AND TITLE LENGTH
  if(updatedContent.type === 'article' && 
    (!updatedContent.title || updatedContent.title.trim() === '')) 
      return {success: false, error: 'MISSING_TITLE'}
  // CHECKING FOR VALID CONTENT LENGTH
  if(!updatedContent.content || updatedContent.content.trim() === '') 
    return {success: false, error: 'EMPTY_CONTENT'}

  // USING MAP TO CHANGE IN THE ARRAY
  const newContentArray = existingContentArray.map((c)=>{
    if(c.id !== contentId) return c
    else return updatedContent
  })

  // RETURNING THE UPDATED CONTENT ARRAY
  return{
    success: true,
    data: newContentArray 
  }
}

// FUNCTION FOR DELETING THE CONTENT
export const deleteContent = (existingContentArray, contentId, userId) => {

  // FETCHING THE CONTENT
  const content = existingContentArray.find((c)=>c.id===contentId)

  // CHECKING IF THE CONTENT EXISTS OR NOT
  if(!content) return {success: false, error: 'NOT_FOUND'}

  // CHECKING THE AUTHOR
  if(content.authorId !== userId) return {success: false, error: 'NOT_OWNER'}

  // DELETING FROM CONTENT
  const newContentArray = existingContentArray.filter((c)=>c.id!==contentId)

  // RETURNING THE UPDATED CONTENT ARRAY
  return {
    success: true,
    data: newContentArray
  }

}