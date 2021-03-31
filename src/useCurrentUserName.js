import { fetchProfileData } from './fakeApi'
import { useEffect, useState } from 'react'

const fetchUser = () => fetchProfileData(sessionStorage.getItem('userId'))

export default function useCurrentUser(anchorElement) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(fetchUser())
  }, [anchorElement])

  return user != null ? user.user.read().name : 'loding name...'
}
