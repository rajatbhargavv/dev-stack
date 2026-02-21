// COLLECTION FOR CONTENT IN LOCALSTORAGE

// loadContent function to load the content from localStorage
// making a constant for setting the key to local storage
const CONTENT_STORAGE_KEY = 'content'

export const loadContent = () => {
    // what the function does? 
        // returning the array after loading from localStorage
    // what does the function guarentee?
        // that it will always return an array, even if localstorage fails, it will return empty array
    // what goes in this function?
        // nothing as parameter goes in this function.

    // getting the array from localStorage

    const response = localStorage.getItem(CONTENT_STORAGE_KEY) // fetching the response from localStorage
    if(!response) return [];               // returning empty array when response is null

    const data = JSON.parse(response)      // getting the response to our useful form
    return Array.isArray(data) ? data : [] // returning empty array incase data is not actually an array    


}

// saveContent function to save the content to localStorage
export const saveContent = (contentArray) => {
    // what does this function do?
        // saving the content array to localStorage
    // what it returns?
        // nothing
    // what it accepts?
        // array of our content

    // setting the contentArray to localStorage
    try {
        localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(contentArray))
    } catch {
        console.warn('persistence error occur saving content array')
    }
}


// COLLECTION FOR USER DETAILS IN LOCALSTORAGE

/* User = {
  id: string,
  email: string,
  name: string | null,
  bio: string | null,
  avatar: string | null,
  createdAt: number
}
 */

// Making a key for user details
const USERS_STORAGE_KEY = 'users'

// Function to laod username from localstorage

export const loadUsers = () => {
    // returns an array of object for the user details.

    const response = localStorage.getItem(USERS_STORAGE_KEY);
    if(!response) return [] // must always return an object no matter what

    const data = JSON.parse(response) // parsing the response we got from localStorage
    return Array.isArray(data) ? data:[] // checking if the parsed data is not of array data type then returning emptyy array
}

export const saveUsers = (usersArray) => {
    // gets the user details as input
    // sets the user details to local storage
    // return nothing

    try{
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersArray))
    }catch{
        console.log('persistence error occur in saving user array.')
    }

}

// Making functions for currentUserID
const CURRENT_USER_STORAGE_KEY = 'currentUserId' // Making the key

export const loadCurrentUserId = () => {
  const response = localStorage.getItem(CURRENT_USER_STORAGE_KEY)
  if (!response) return null

  const data = JSON.parse(response)
  return typeof data === 'string' ? data : null
}


export const saveCurrentUserId = (currentUserId) => {
  try {
    if (!currentUserId) {
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
    } else {
      localStorage.setItem(
        CURRENT_USER_STORAGE_KEY,
        JSON.stringify(currentUserId)
      )
    }
  } catch {
    console.log('persistence error occur in saving current user.')
  }
}
