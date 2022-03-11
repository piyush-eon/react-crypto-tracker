import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

export default function InfoTable() {
  const [users, setUser] = useState([])

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) =>
        setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className='container'>
      {users.map((user) => (
        <div>
          {user.name},{user.age}
        </div>
      ))}
    </div>
  )
}

