import React, { Suspense, useState, useRef } from 'react'
import useCurrentUser from './useCurrentUser'
import useCurrentUserName from './useCurrentUserName'
import { fetchProfileData } from './fakeApi'

function ProfileDetails({ initialResource }) {
  return <h1>{useCurrentUser(initialResource).name}</h1>;
}
function ProfileDetailsName(anchorElement) {
  return <h2>{useCurrentUserName(anchorElement)}</h2>;
}
function ProfilePage() {

  const [userId, setUserId] = useState(0);
  const initialResource = fetchProfileData(userId);
  const refUserId = useRef(null)
  const refForm = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    setUserId(refUserId.current.value)
    sessionStorage.setItem('userId', refUserId.current.value);
  }
  return (
    <>
      <form onSubmit={onSubmit} ref={refForm}>
        <input ref={refUserId} type='number' min='0' placeholder='id user'></input>
        <button type='submit'> Ok</button>
      </form>

      <Suspense fallback={<h1>Loading Name User...</h1>}>
        <ProfileDetails initialResource={initialResource} />
      </Suspense>

      <Suspense fallback={<h1>Loading  Name User...</h1>}>
        <ProfileDetailsName anchorElement={refForm} />
      </Suspense>
    </>
  );
}


const App = () => {
  return (<ProfilePage />)
}
export default App



