import "./signin.css";
import img from "../../assets/signin.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormControl from "../../component/FormControl";
import logIn from "../../api/auth";
import { ROLES } from "../../api/auth";
import { motion } from "framer-motion";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const from = location.state?.from;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const { response, errorMessage } = await logIn(email, password);
    if (!errorMessage) {
      if (response.role === ROLES.admin) navigate("/admin");
      else navigate(from ? from : "/", { replace: true });
      window.location.reload();
    } else {
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    setIsPending(false);
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Sign In"}
          </Button>
          <p>
            New User?{" "}
            <Link className="sigin-up-link" to="/sign-up">
              SignUp
            </Link>
          </p>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {" "}
              <p style={{ margin: "0" }} className="error">
                {errorMessage}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Signin;
