

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const resetSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  newPassword: yup.string().required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const LoginPage = () => {
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resetError, setResetError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    reset,
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  useEffect(() => {
    if (showModal) {
      const savedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (savedUser?.username) {
        reset({ username: savedUser.username });
      }
    }
  }, [showModal, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:8080/api/login-users');
      const users = response.data;
      const user = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (user) {
        const minimalUser = {
         userId: user.userId || user.id, // FIX: fallback to 'id' if 'userId' is not present
          email: user.email,
          roleType: user.roleType,
          username: user.username,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(minimalUser));

        const role = user.roleType?.trim().toUpperCase();

        if (role === 'ADMIN') navigate('/admin');
        else if (role === 'HR') navigate('/hr');
        else if (role === 'EMPLOYEE') navigate('/employee');
        else if (role === 'MANAGER') navigate('/manager');
        else if (role === 'BUDGET TEAM') navigate('/budget');
        else setError('Role not recognized: ' + user.roleType);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Server error occurred');
    }
  };

  const handleResetPassword = async (data) => {
    try {
      const res = await axios.get('http://localhost:8080/api/login-users');
      const users = res.data;
      const user = users.find((u) => u.username === data.username);

      if (user) {
        const updatedUser = {
          ...user,
          userId: user.userId || user.id,
          password: data.newPassword,
        }; //jwdwjdjwdjwbdjhwbdhwbdjhwbjhb

        await axios.put(`http://localhost:8080/api/login-users/${updatedUser.userId}`, updatedUser);

        alert('Password reset successful!');
        setShowModal(false);
        reset();
      } else {
        setResetError('Username not found');
      }
    } catch (err) {
      console.error(err);
      setResetError('Failed to reset password');
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        // background: 'linear-gradient(135deg, #667eea, #764ba2)',
        backgroundColor:white,
        padding: '1rem',
      }}
    >
      <HeaderComponent />

      <div
        className="d-flex align-items-center mb-4"
        style={{ width: '400px', maxWidth: '90%' }}
      >
        <hr style={{ flex: 1, borderTop: '2px solid white', marginRight: '1rem' }} />
        <h1 className="text-white mb-0" style={{ fontWeight: '700', letterSpacing: '3px', fontSize: '1.8rem' }}>
          PranHirefy
        </h1>
        <hr style={{ flex: 1, borderTop: '2px solid white', marginLeft: '1rem' }} />
      </div>

      <div
        className="card shadow-lg p-4"
        style={{
          width: '400px',
          height: 'auto',
          borderRadius: '1rem',
          position: 'relative',
        }}
      >
        <h2 className="text-center mb-4 text-primary">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 position-relative">
            <span className="position-absolute top-50 translate-middle-y ps-3 text-muted" style={{ fontSize: '1.2rem' }}>
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              placeholder="Username"
              {...register('username')}
              className={`form-control ps-5 ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
          </div>

          <div className="mb-3 position-relative">
            <span className="position-absolute top-50 translate-middle-y ps-3 text-muted" style={{ fontSize: '1.2rem' }}>
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className={`form-control ps-5 ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          {error && <div className="alert alert-danger mt-3 mb-0 text-center">{error}</div>}
        </form>

        <div className="text-center mt-3">
          <button type="button" className="btn btn-link" onClick={() => {
            setResetError('');
            setShowModal(true);
          }}>
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleResetSubmit(handleResetPassword)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${resetErrors.username ? 'is-invalid' : ''}`}
                {...resetRegister('username')}
                readOnly
              />
              {resetErrors.username && (
                <div className="invalid-feedback">{resetErrors.username.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className={`form-control ${resetErrors.newPassword ? 'is-invalid' : ''}`}
                {...resetRegister('newPassword')}
              />
              {resetErrors.newPassword && (
                <div className="invalid-feedback">{resetErrors.newPassword.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${resetErrors.confirmPassword ? 'is-invalid' : ''}`}
                {...resetRegister('confirmPassword')}
              />
              {resetErrors.confirmPassword && (
                <div className="invalid-feedback">{resetErrors.confirmPassword.message}</div>
              )}
            </div>

            {resetError && (
              <div className="alert alert-danger text-center">{resetError}</div>
            )}

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" className="ms-2">Reset Password</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;
