import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
import {createOrUpdateUser} from '../../functions/auth'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch()

  useEffect(() => {
    console.log(window.localStorage.getItem("emailForRegistration"));
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, [history]);

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

        createOrUpdateUser(idTokenResult.token)
        .then(
          // res => console.log('CREATE OR UPDATE RESPONSE', res)
          (res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                // token: idTokenResult
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          }
        )
        .catch(error =>console.log(error));

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
