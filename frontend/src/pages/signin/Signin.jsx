import "./signin.css";
import img from "../../assets/signin.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import FormControl from "../../component/FormControl";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
            type="email"
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
          <input type="submit" title="SIGNIN" />
          <p>
            New User?{" "}
            <Link className="sigin-up-link" to="/sign-up">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default Signin;
