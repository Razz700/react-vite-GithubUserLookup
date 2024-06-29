import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {
  const [name,setname]=useState('');
  const handleinput=(e)=>setname(e.target.value);
  const [dataName,setdataName]=useState('');
  const [dataUser,setdataUser]=useState('');
  const [dataFollowers,setdataFollowers]=useState('');
  const [dataFollowing,setdataFollowing]=useState('');
  const [dataCom,setdataCom]=useState('');
  const [dataWork,setdataWork]=useState('');
  const [dataImg,setdataImg]=useState('');
  useEffect(()=>{
    document.getElementById('usercard1').style.display='none';
    document.getElementById('error').style.display='none';
  },[]);
    const apirequest=async(e)=>{
      e.preventDefault();
      document.getElementById('error').style.display='none';
      if (name=='') {
        alert('Input field cannot be empty!');
        return;
      }
      document.getElementById('usercard1').style.display='flex';
     await axios({
        method: 'get',
        url: `https://api.github.com/users/${name}`,
      }).then(function (response) {
         setdataName(response.data.name);
         setdataUser(response.data.login);
         setdataFollowers(response.data.followers);
         setdataFollowing(response.data.following);
         setdataCom(response.data.company);
         setdataWork(response.data.bio);
         setdataImg(response.data.avatar_url);
        }).catch((e)=>{
console.error(e);
document.getElementById('usercard1').style.display='none';
document.getElementById('error').style.display='block';
        })
    setname('');
    }
  return (
    <div>
      <div className="container">
        <h1>Github UserLookup</h1>
        <form className='formcard'>
          <input type="text" onChange={handleinput} value={name} placeholder='Enter Github Username'/>
          <button onClick={apirequest}>Search</button>
        </form>
        <div id="error">No users Found!</div>
        <div className="userCard" id='usercard1'>
          <div className="userbody">
            <p className="name">
              {dataName}
            </p>
            <em>{dataUser}</em>
        
            <div>
            <div className='followers'>
              <p>Followers:{dataFollowers}</p>
              <p>Following:{dataFollowing}</p>
            </div>
            <div>
              <p>🏦{dataCom}</p>
              <p>📝{dataWork}</p>
            </div>
            </div>
            </div>  
            <div className="userimg">
              <img src={dataImg} alt="user-image" />
            </div>
         
      </div>
      </div>
    </div>
  )
}

export default App