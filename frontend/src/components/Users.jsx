import React, { useEffect, useState } from 'react';
import axios  from 'axios';
import Button from './Button';

const Users = ( ) => {

  const [users, setUsers] = useState([]);
  const [filter , setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulks?filter=" + filter)
    .then(response => {
      setUsers(response.data.user)
    })
  } , [filter])

  return <>
  <div className='my-2'>
    <input onChange={(e) => {
      setFilter(e.target.value)
    }}
     type="text"  placeholder='Search users...' className='w-full px-2 py-1 border rounded border-slate-200' />
  </div>
  <div>
    {users.map(user => <User user={user}/>)}
  </div>
  </>

};


function User({user}){
  return 
  <div className='flex justify-between'>
      <div className='flex'>
         <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
             <div className='flex flex-col justify-center h-full text-xl'>
              {user.firstName[0]}
             </div>
         </div>
         <div className='flex flex-col justify-center h-full'>
             <div>
                 {user.firstName}  {user.lastName}
             </div>
         </div>
      </div>
      <div className='flex flex-col justify-center h-full'>
        <Button label={"send money"}/>
      </div>
  </div>
}

export default Users;