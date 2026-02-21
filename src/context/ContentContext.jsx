import React from 'react'
import { createContent, deleteContent, publishContent, updateContent } from '../hooks/useContextLogic'
import { loadContent, saveContent } from '../utils/storage'

// CREATING THE CONTEXT
const ContentContext = React.createContext(null)

export const ContentProvider = ({children}) => {  // PASSING CHILDREN AS PROPS IN THIS
    // STORING THE CONTENT ARRAY
    const [contentArray, setContentArray] = React.useState([])
    // MAKING A HYDRATED FLAG
    const [hydrated, setHydrated] = React.useState(false)
    
    // EFFECT (LOADING AND SETTING TO LOCALSTORAGE)
    React.useEffect(()=>{
        const store = loadContent()
        setContentArray(store)
        setHydrated(true)
    }, [])
    
    React.useEffect(()=>{
        if(!hydrated) return        // IT PREVENTS OVERRIDE
        saveContent(contentArray)
    }, [contentArray, hydrated])
    
    const createContentAction = (inputs) => {
        const result = createContent(contentArray, inputs)
        if(result.success){
            setContentArray(result.data)
        }
        console.log(result)
        return result
    }

    const publishContentAction = (contentId, userId, visibility) => {
        const result = publishContent(contentArray, contentId, userId, visibility)
        if(result.success){
            setContentArray(result.data)
        }
        return result
    }

    const updateContentAction = (contentId, userId, updates) => {
        const result = updateContent(contentArray, contentId, userId, updates)
        if(result.success){
            setContentArray(result.data)
        }
        return result
    }

    const deleteContentAction = (contentId, userId) => {
        const result = deleteContent(contentArray, contentId, userId)
        if(result.success){
            setContentArray(result.data)
        }
        return result
    }

    return (
        <ContentContext.Provider
            value={{     // PASSING VALUES IN THE CONTENT CONTEXT, NOW EVERY FILE USING THE CONTENT CONTEXT WILL HAVE ACCESS TO THESE VALUES
                content: contentArray,
                createContent: createContentAction,
                publishContent: publishContentAction,
                updateContent: updateContentAction,
                deleteContent: deleteContentAction
            }}
        >
            {children}
        </ContentContext.Provider>
    )
}

export const useContent = () => {
    const context = React.useContext(ContentContext)
    if (!context) {
        throw new Error('useContent must be used inside ContentProvider')
    }
    return context
}
