import React from 'react';
import BottomWarning from '../components/BottomWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Create an account to get started"} />
          <InputBox placeholder="Enter your name" label={"Name"} />
          <InputBox placeholder="kunwar@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <InputBox placeholder="Confirm your password" label={"Confirm Password"} />
          <div className="pt-4">
            <Button text={'Sign up'} />
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
