import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(window.localStorage.getItem("emailForRegistration"));
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, []);

  const handleSubmit = async (e) => {
    // validation
    if(!email || !password) {
      toast.error('Email and/or password is required')
      return
    }

    if(password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("RESULT:", result);
      if (result.user.emailVerified) {
        // remove user email from local storage  
        window.localStorage.removeItem('emailFor Registration')
        //get user id token
        let user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()
        console.log('user:', user,);
        console.log('idTokenResult:', idTokenResult);
        //then populate user in redux store

        // and redirect
        history.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const CompleteRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter your password"
      />
      <br />
      <button type="submit" className="btn btn-raised">
        {" "}
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h4>Complete Register</h4>
          {CompleteRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
