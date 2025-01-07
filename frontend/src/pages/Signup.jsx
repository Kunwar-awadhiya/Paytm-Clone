
import React, {useState} from 'react';
import axios from "axios";
import BottomWarning from '../components/BottomWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';

const Signup = () => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [username, setUserName] = useState(""); 
  const [password, setPassword] = useState(""); 

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Create an account to get started"} />

        
          <InputBox onChange={e => {
            setFirstName(e.target.value)
          }}
          placeholder="Enter your first name" label={"First Name"} />
          
          
          <InputBox onChange={(e) => {
            setLastName(e.target.value)
          }} 
          placeholder="Enter your last name" label={"Last Name"} />

          <InputBox onChange={e=>{
            setUserName(e.target.value)
          }} placeholder="youremail@example.com" label={"Email"} />

       
          <InputBox  onChange={e => {
            setPassword(e.target.value)
          }}placeholder="Enter your password" label={"Password"} />

          <div className="pt-4">
            <Button onClick={()=>{
              axios.post("http://localhost:3000/api/v1/user/signup" ,{
                firstName,
                lastName,
                username,
                password
              })
            }} 
            label={'Sign up'} />
          </div>

         
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;


