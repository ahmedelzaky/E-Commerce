import "../../pages/signin/signin.css";
import img from "../../assets/signin.webp";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { GoAlertFill } from "react-icons/go";
import FormControl from "../../component/FormControl";
import { signUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!/^[+]\d+$/.test(phone)) {
      formErrors.phone = "Phone number must be like +2010000000";
    }
    if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      formErrors.password = "Passwords do not match";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { errorMessage } = await signUp({
        email,
        firstName,
        lastName,
        phone,
        password,
      });
      if (errorMessage) {
        setErrors({ email: errorMessage });
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Form className="login-page" onSubmit={handleSubmit}>
      <div className="login">
        <div className="r-section">
          <h2>Welcome Back!</h2>
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
          <h2>SIGN UP</h2>
          <FormControl
            type="text"
            label="First Name"
            value={firstName}
            setValue={setFirstName}
          />
          <FormControl
            type="text"
            label="Last Name"
            value={lastName}
            setValue={setLastName}
          />
          <FormControl
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          {errors.email && (
            <p className="error-form">
              <GoAlertFill />
              {errors.email}
            </p>
          )}

          <FormControl
            type="text"
            label="Phone"
            value={phone}
            setValue={setPhone}
          />
          {errors.phone && (
            <p className="error-form">
              <GoAlertFill />
              {errors.phone}
            </p>
          )}

          <FormControl
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          {errors.password && (
            <p className="error-form">
              <GoAlertFill />
              {errors.password}
            </p>
          )}

          <FormControl
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <input type="submit" title="SIGNUP" />
        </div>
      </div>
    </Form>
  );
}

export default Signup;
