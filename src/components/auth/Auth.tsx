import React, { useState } from "react";
import Image from "next/image";
import Login from "./Login";
import SignUp from "./SignUp";
import logo from "public/assets/logo-dark.svg";

interface authType {
  type: string;
}
const Auth = () => {
  const [signUp, setSignUp] = useState<boolean>(true);
  const setType = () => {
    setSignUp(!signUp);
  };
  return (
    <div className="authPageContainer">
      <div className="authTitleWrapper">
        <Image src={logo} alt="light theme switch" />
        <p>An app for managing task&apos;s</p>
      </div>
      <div className="authContainer">
        {/* <h1>{type}</h1> */}
        <div>{signUp ? <SignUp /> : <Login />}</div>
        {signUp ? (
          <div className="selection">
            <p>already have an account?</p>
            <p className="button" onClick={() => setType()}>
              login
            </p>
          </div>
        ) : (
          <div className="selection">
            <p>don't have an account?</p>
            <p className="button" onClick={() => setType()}>
              sign up
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
