import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, phoneNumber, emailId, password };

    try {
      const response = await axios.post('http://localhost:5000/signup', userData);
      console.log(response.data);

      toast.success('Sign Up successful! Redirecting to login...');

      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmailId('');
      setPassword('');

      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong.');
      } else if (error.request) {
        setError('No response from server.');
      } else {
        setError('Error in form submission.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg mb-3">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-3">
          Create Your Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center mb-3">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
