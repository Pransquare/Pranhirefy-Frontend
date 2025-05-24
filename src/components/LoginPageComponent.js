// import React, { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import HeaderComponent from "./HeaderComponent";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import "../App.css";

// // Schemas
// const loginSchema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   password: yup.string().required("Password is required"),
// });

// const emailSchema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
// });

// const otpSchema = yup.object().shape({
//   otp: yup.string().required("OTP is required"),
//   newPassword: yup.string().required("New password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("newPassword"), null], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const LoginPage = () => {
//   const [error, setError] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [step, setStep] = useState("email"); // email | otp | confirmation
//   const [showModal, setShowModal] = useState(false);
//   const [emailForReset, setEmailForReset] = useState("");
//   const [showResetLinkModal, setShowResetLinkModal] = useState(false);

//   const navigate = useNavigate();
//   const resetLinkSchema = yup.object().shape({
//     email: yup.string().email("Invalid email").required("Email is required"),
//   });

//   const {
//     register: resetLinkRegister,
//     handleSubmit: handleResetLinkSubmit,
//     formState: { errors: resetLinkErrors },
//     reset: resetResetLinkForm,
//   } = useForm({
//     resolver: yupResolver(resetLinkSchema),
//   });
//   // Login form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//   });

//   // Email form
//   const {
//     register: emailRegister,
//     handleSubmit: handleEmailSubmit,
//     formState: { errors: emailErrors },
//     reset: resetEmailForm,
//   } = useForm({
//     resolver: yupResolver(emailSchema),
//   });

//   // OTP and password form
//   const {
//     register: otpRegister,
//     handleSubmit: handleOtpSubmit,
//     formState: { errors: otpErrors },
//     reset: resetOtpForm,
//   } = useForm({
//     resolver: yupResolver(otpSchema),
//   });
//   const handleSendResetLink = async (data) => {
//     try {
//       await axios.post(
//         "http://localhost:8080/api/login-users/send-reset-link",
//         {
//           email: data.email,
//         }
//       );
//       alert("Reset link sent to your email.");
//       setShowResetLinkModal(false);
//     } catch (err) {
//       alert("Failed to send reset link. Please try again.");
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/login-users/login",
//         {
//           username: data.username,
//           password: data.password,
//         }
//       );

//       const user = response.data;
//       localStorage.setItem(
//         "loggedInUser",
//         JSON.stringify({
//           userId: user.userId || user.id,
//           email: user.email,
//           roleType: user.roleType,
//           username: user.username,
//         })
//       );

//       const role = user.roleType?.trim().toUpperCase();
//       if (role === "ADMIN") navigate("/admin");
//       else if (role === "HR") navigate("/hr");
//       else if (role === "EMPLOYEE") navigate("/employee");
//       else if (role === "MANAGER") navigate("/manager");
//       else if (role === "BUDGET TEAM") navigate("/budget");
//       else setError("Role not recognized: " + user.roleType);
//     } catch (error) {
//       setError("Invalid username or password");
//     }
//   };

//   // Step 1: send OTP
//   const handleSendOtp = async (data) => {
//     try {
//       await axios.post("http://localhost:8080/api/login-users/send-otp", {
//         email: data.email,
//       });
//       setEmailForReset(data.email);
//       setStep("otp");
//     } catch (err) {
//       setOtpError("Failed to send OTP. Make sure the email is correct.");
//     }
//   };

//   // Step 2: verify OTP & reset password
//   const handleVerifyOtpAndReset = async (data) => {
//     try {
//       const payload = {
//         email: emailForReset,
//         otp: data.otp,
//         newPassword: data.newPassword,
//       };
//       await axios.post(
//         "http://localhost:8080/api/login-users/verify-otp-reset-password",
//         payload
//       );
//       setStep("confirmation");
//     } catch (err) {
//       setOtpError("Invalid OTP or error resetting password.");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setStep("email");
//     resetEmailForm();
//     resetOtpForm();
//     setOtpError("");
//   };

//   return (
//     <div
//       className="d-flex flex-column align-items-center justify-content-center"
//       style={{
//         minHeight: "100vh",
//         // background: 'linear-gradient(135deg, #667eea, #764ba2)',
//         // padding: '1rem',
//         //  minHeight: '100vh',
//         // background: 'linear-gradient(135deg, #0f2027, #203a43,rgb(71, 232, 244))', // deep blue gradient
//         background: "rgb(147, 194, 249)",
//         padding: "1rem",
//         fontFamily: "Poppins, sans-serif",
//       }}
//     >
//       <HeaderComponent />

//       <div
//         className="d-flex align-items-center mb-4"
//         style={{ width: "400px", maxWidth: "90%" }}
//       >
//         <hr
//           style={{ flex: 1, borderTop: "2px solid white", marginRight: "1rem" }}
//         />
//         <h1
//           className="text-white mb-0"
//           style={{
//             fontWeight: "700",
//             letterSpacing: "3px",
//             fontSize: "1.8rem",
//           }}
//         >
//           PranHirefy
//         </h1>
//         <hr
//           style={{ flex: 1, borderTop: "2px solid white", marginLeft: "1rem" }}
//         />
//       </div>

//       <div
//         className="card shadow-lg p-4"
//         style={{
//           width: "400px",
//           borderRadius: "1rem",
//           backdropFilter: "blur(10px)",
//           backgroundColor: "rgba(255, 255, 255, 0.15)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//           color: "white",
//         }}
//       >
//         <h2 className="text-center mb-4" style={{ color: "rgb(68, 38, 217)" }}>
//           Welcome Back
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-3 position-relative">
//             <span
//               className="position-absolute top-50 translate-middle-y ps-3 text-muted"
//               style={{ fontSize: "1.2rem" }}
//             >
//               <i className="bi bi-person-fill"></i>
//             </span>
//             <input
//               type="text"
//               placeholder="Username"
//               {...register("username")}
//               className={`form-control ps-5 ${
//                 errors.username ? "is-invalid" : ""
//               }`}
//             />
//             {errors.username && (
//               <div className="invalid-feedback">{errors.username.message}</div>
//             )}
//           </div>

//           <div className="mb-3 position-relative">
//             <span
//               className="position-absolute top-50 translate-middle-y ps-3 text-muted"
//               style={{ fontSize: "1.2rem" }}
//             >
//               <i className="bi bi-lock-fill"></i>
//             </span>
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password")}
//               className={`form-control ps-5 ${
//                 errors.password ? "is-invalid" : ""
//               }`}
//             />
//             {errors.password && (
//               <div className="invalid-feedback">{errors.password.message}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             style={{
//               background: "linear-gradient(to right, #667eea, #764ba2)",
//               border: "none",
//             }}
//           >
//             Login
//           </button>

//           {error && (
//             <div className="alert alert-danger mt-3 mb-0 text-center">
//               {error}
//             </div>
//           )}
//         </form>

//         <div className="text-center mt-3">
//           <button
//             type="button"
//             className="btn"
//             style={{ color: "rgb(77, 84, 225)" }}
//             onClick={() => setShowModal(true)}
//           >
//             Forgot Password?
//           </button>

//           <button
//             type="button"
//             className="btn"
//             style={{ color: "rgb(77, 84, 225)" }}
//             onClick={() => setShowResetLinkModal(true)}
//           >
//             Reset via Email
//           </button>
//         </div>
//       </div>

//       {/* Modal: OTP Flow */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {step === "email"
//               ? "Send OTP"
//               : step === "otp"
//               ? "Verify OTP & Reset Password"
//               : "Success"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             borderRadius: "0.5rem",
//           }}
//         >
//           {step === "email" && (
//             <form onSubmit={handleEmailSubmit(handleSendOtp)}>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   {...emailRegister("email")}
//                   className={`form-control ${
//                     emailErrors.email ? "is-invalid" : ""
//                   }`}
//                 />
//                 {emailErrors.email && (
//                   <div className="invalid-feedback">
//                     {emailErrors.email.message}
//                   </div>
//                 )}
//               </div>
//               {otpError && (
//                 <div className="alert alert-danger text-center">{otpError}</div>
//               )}
//               <div className="text-end">
//                 <Button variant="secondary" onClick={closeModal}>
//                   Cancel
//                 </Button>
//                 <Button type="submit" variant="primary" className="ms-2">
//                   Send OTP
//                 </Button>
//               </div>
//             </form>
//           )}

//           {step === "otp" && (
//             <form onSubmit={handleOtpSubmit(handleVerifyOtpAndReset)}>
//               <div className="mb-3">
//                 <label>OTP</label>
//                 <input
//                   type="text"
//                   {...otpRegister("otp")}
//                   className={`form-control ${
//                     otpErrors.otp ? "is-invalid" : ""
//                   }`}
//                 />
//                 {otpErrors.otp && (
//                   <div className="invalid-feedback">
//                     {otpErrors.otp.message}
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <label>New Password</label>
//                 <input
//                   type="password"
//                   {...otpRegister("newPassword")}
//                   className={`form-control ${
//                     otpErrors.newPassword ? "is-invalid" : ""
//                   }`}
//                 />
//                 {otpErrors.newPassword && (
//                   <div className="invalid-feedback">
//                     {otpErrors.newPassword.message}
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   {...otpRegister("confirmPassword")}
//                   className={`form-control ${
//                     otpErrors.confirmPassword ? "is-invalid" : ""
//                   }`}
//                 />
//                 {otpErrors.confirmPassword && (
//                   <div className="invalid-feedback">
//                     {otpErrors.confirmPassword.message}
//                   </div>
//                 )}
//               </div>
//               {otpError && (
//                 <div className="alert alert-danger text-center">{otpError}</div>
//               )}
//               <div className="text-end">
//                 <Button variant="secondary" onClick={closeModal}>
//                   Cancel
//                 </Button>
//                 <Button type="submit" variant="primary" className="ms-2">
//                   Reset Password
//                 </Button>
//               </div>
//             </form>
//           )}

//           {step === "confirmation" && (
//             <div className="text-center">
//               <p className="text-success fw-bold">Password reset successful!</p>
//               <Button variant="primary" onClick={closeModal}>
//                 Back to Login
//               </Button>
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>
//       <Modal
//         show={showResetLinkModal}
//         onHide={() => setShowResetLinkModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Reset Password via Email</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             borderRadius: "0.5rem",
//           }}
//         >
//           <form onSubmit={handleResetLinkSubmit(handleSendResetLink)}>
//             <div className="mb-3">
//               <label>Email</label>
//               <input
//                 type="email"
//                 {...resetLinkRegister("email")}
//                 className={`form-control ${
//                   resetLinkErrors.email ? "is-invalid" : ""
//                 }`}
//               />
//               {resetLinkErrors.email && (
//                 <div className="invalid-feedback">
//                   {resetLinkErrors.email.message}
//                 </div>
//               )}
//             </div>
//             <div className="text-end">
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowResetLinkModal(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" className="ms-2">
//                 Send Reset Link
//               </Button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default LoginPage; // src/components/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import HeaderComponent from "./HeaderComponent";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const otpSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const resetLinkSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [step, setStep] = useState("email"); // email | otp | confirmation
  const [showModal, setShowModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [showResetLinkModal, setShowResetLinkModal] = useState(false);

  // Loading states
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingOtpSend, setLoadingOtpSend] = useState(false);
  const [loadingOtpReset, setLoadingOtpReset] = useState(false);
  const [loadingResetLink, setLoadingResetLink] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmailForm,
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    reset: resetOtpForm,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const {
    register: resetLinkRegister,
    handleSubmit: handleResetLinkSubmit,
    formState: { errors: resetLinkErrors },
    reset: resetResetLinkForm,
  } = useForm({
    resolver: yupResolver(resetLinkSchema),
  });

  const onSubmit = async (data) => {
    setError("");
    setLoadingLogin(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login-users/login",
        {
          username: data.username,
          password: data.password,
        }
      );
      const user = response.data;
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          userId: user.userId || user.id,
          email: user.email,
          roleType: user.roleType,
          username: user.username,
        })
      );
      const role = user.roleType?.trim().toUpperCase();
      if (role === "ADMIN") navigate("/admin");
      else if (role === "HR") navigate("/hr");
      else if (role === "EMPLOYEE") navigate("/employee");
      else if (role === "MANAGER") navigate("/manager");
      else if (role === "BUDGET TEAM") navigate("/budget");
      else setError("Role not recognized: " + user.roleType);
    } catch (error) {
      setError(error.response?.data || "Invalid username or password");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleSendOtp = async (data) => {
    setOtpError("");
    setLoadingOtpSend(true);
    try {
      await axios.post("http://localhost:8080/api/login-users/send-otp", {
        email: data.email,
      });
      setEmailForReset(data.email);
      setStep("otp");
    } catch (err) {
      setOtpError(
        err.response?.data ||
          "Failed to send OTP. Make sure the email is correct."
      );
    } finally {
      setLoadingOtpSend(false);
    }
  };

  const handleVerifyOtpAndReset = async (data) => {
    setOtpError("");
    setLoadingOtpReset(true);
    try {
      const payload = {
        email: emailForReset,
        otp: data.otp,
        newPassword: data.newPassword,
      };
      await axios.post(
        "http://localhost:8080/api/login-users/verify-otp-reset-password",
        payload
      );
      setStep("confirmation");
    } catch (err) {
      setOtpError(
        err.response?.data || "Invalid OTP or error resetting password."
      );
    } finally {
      setLoadingOtpReset(false);
    }
  };

  const handleSendResetLink = async (data) => {
    setLoadingResetLink(true);
    try {
      await axios.post(
        `http://localhost:8080/api/login-users/password-reset-request?email=${encodeURIComponent(
          data.email
        )}`
      );
      alert("Reset link sent to your email.");
      setShowResetLinkModal(false);
      resetResetLinkForm();
    } catch (err) {
      alert(
        err.response?.data || "Failed to send reset link. Please try again."
      );
      console.error(
        "Reset link send error:",
        err.response?.data || err.message
      );
    } finally {
      setLoadingResetLink(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStep("email");
    resetEmailForm();
    resetOtpForm();
    setOtpError("");
    setError("");
  };

  const closeResetLinkModal = () => {
    setShowResetLinkModal(false);
    resetResetLinkForm();
    setError("");
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "rgb(147, 194, 249)",
        padding: "1rem",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <HeaderComponent />

      <div
        className="d-flex align-items-center mb-4"
        style={{ width: "400px", maxWidth: "90%" }}
      >
        <hr
          style={{ flex: 1, borderTop: "2px solid white", marginRight: "1rem" }}
        />
        <h1
          className="text-white mb-0"
          style={{
            fontWeight: "700",
            letterSpacing: "3px",
            fontSize: "1.8rem",
          }}
        >
          PranHirefy
        </h1>
        <hr
          style={{ flex: 1, borderTop: "2px solid white", marginLeft: "1rem" }}
        />
      </div>

      <div
        className="card shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "1rem",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "rgb(68, 38, 217)" }}>
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3 position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ fontSize: "1.2rem" }}
            >
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className={`form-control ps-5 ${
                errors.username ? "is-invalid" : ""
              }`}
              autoComplete="username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-3 position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ fontSize: "1.2rem" }}
            >
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`form-control ps-5 ${
                errors.password ? "is-invalid" : ""
              }`}
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loadingLogin}
            style={{
              background: "linear-gradient(to right, #667eea, #764ba2)",
              border: "none",
            }}
          >
            {loadingLogin ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div
              className="mt-3 text-center text-danger"
              style={{ fontWeight: "600" }}
            >
              {error}
            </div>
          )}
        </form>

        <p
          className="mt-3 text-center text-white"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setShowModal(true)}
        >
          Forgot Password?
        </p>

        <p
          className="mt-1 text-center text-white"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setShowResetLinkModal(true)}
        >
          Forgot Password (via Reset Link)
        </p>
      </div>

      {/* OTP Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {step === "email" && "Enter Email for OTP"}
            {step === "otp" && "Enter OTP and New Password"}
            {step === "confirmation" && "Password Reset Successful"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit(handleSendOtp)} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  {...emailRegister("email")}
                  className={`form-control ${
                    emailErrors.email ? "is-invalid" : ""
                  }`}
                  autoComplete="email"
                />
                {emailErrors.email && (
                  <div className="invalid-feedback">
                    {emailErrors.email.message}
                  </div>
                )}
              </div>
              {otpError && (
                <div className="text-danger mb-3" style={{ fontWeight: "600" }}>
                  {otpError}
                </div>
              )}
              <Button
                variant="primary"
                type="submit"
                disabled={loadingOtpSend}
                className="w-100"
              >
                {loadingOtpSend ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form
              onSubmit={handleOtpSubmit(handleVerifyOtpAndReset)}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  {...otpRegister("otp")}
                  className={`form-control ${
                    otpErrors.otp ? "is-invalid" : ""
                  }`}
                />
                {otpErrors.otp && (
                  <div className="invalid-feedback">
                    {otpErrors.otp.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...otpRegister("newPassword")}
                  className={`form-control ${
                    otpErrors.newPassword ? "is-invalid" : ""
                  }`}
                  autoComplete="new-password"
                />
                {otpErrors.newPassword && (
                  <div className="invalid-feedback">
                    {otpErrors.newPassword.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...otpRegister("confirmPassword")}
                  className={`form-control ${
                    otpErrors.confirmPassword ? "is-invalid" : ""
                  }`}
                  autoComplete="new-password"
                />
                {otpErrors.confirmPassword && (
                  <div className="invalid-feedback">
                    {otpErrors.confirmPassword.message}
                  </div>
                )}
              </div>

              {otpError && (
                <div className="text-danger mb-3" style={{ fontWeight: "600" }}>
                  {otpError}
                </div>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={loadingOtpReset}
                className="w-100"
              >
                {loadingOtpReset ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          )}

          {step === "confirmation" && (
            <div className="text-center">
              <p>Your password has been reset successfully.</p>
              <Button
                variant="success"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Reset Link Modal */}
      <Modal
        show={showResetLinkModal}
        onHide={closeResetLinkModal}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Password Reset via Email Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleResetLinkSubmit(handleSendResetLink)}
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="resetEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="resetEmail"
                {...resetLinkRegister("email")}
                className={`form-control ${
                  resetLinkErrors.email ? "is-invalid" : ""
                }`}
                autoComplete="email"
              />
              {resetLinkErrors.email && (
                <div className="invalid-feedback">
                  {resetLinkErrors.email.message}
                </div>
              )}
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={loadingResetLink}
              className="w-100"
            >
              {loadingResetLink ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;
