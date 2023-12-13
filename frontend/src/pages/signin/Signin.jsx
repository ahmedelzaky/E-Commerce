import "./signin.css";
import img from "../../assets/signin.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import FormControl from "../../component/FormControl";
import logIn from "../../api/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errorMessage } = await logIn(email, password);
    if (!errorMessage) {
      navigate("/");
    } else {
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Form className="login-page" onSubmit={handleSubmit}>
      <div className="login">
        <div className="r-section">
          <h2>Wlecome To The Website</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            magnam praesentium assumenda aperiam illo, libero facilis laborum
            fugiat quae dolorem!
          </p>
          <div className="img">
            <img src={img} alt=".." />
          </div>
        </div>
        <div className="l-section">
          <h2>SIGN IN</h2>
          <FormControl
            type="text"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <FormControl
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          <div className="forget">
            <div className="a">
              <label className="container">
                Remember Me
                <input type="checkbox" defaultChecked="checked" />
                <span className="checkmark" />
              </label>
            </div>
          </div>
          <input type="submit" name="SIGNIN" title="SIGNIN" />
          <p>
            New User?{" "}
            <Link className="sigin-up-link" to="/sign-up">
              SignUp
            </Link>
          </p>
          {errorMessage && (
            <p style={{ margin: "0" }} className="error">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Signin;
