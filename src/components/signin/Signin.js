import React, { useRef } from 'react'
// import './signin.css'
import './login.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from '../../redux/actions/registrationActions';
import signin from './signin.png'

const SignIn = () => {
  const nav = useNavigate();
  const { authDataReducer } = useSelector(state => state);
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch()
  // const [data, setData] = useState({ email: "", pass: "" })
  const handleSubmmit = (e) => {
    e.preventDefault()
    dispatch(signInAction({ email: emailRef.current.value, pass: passRef.current.value }, nav))
  }

  return (
    <>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={signin} alt="signin" />
          </div>
          <div className='secondpart'>
            <form onSubmit={handleSubmmit}>
              <h3>Log In</h3>
              <input type="text" ref={emailRef} id="login" className="fadeIn second" name="email" placeholder="email" />
              <input type="password" ref={passRef} id="password" className="fadeIn third" name="pass" placeholder="password" />
              {authDataReducer.error && <span className="text-danger">* {authDataReducer.error}</span>}
              <div className='d-flex justify-content-end'>
                <input type="submit" className="my-2 fadeIn fourth" value="Log In" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn