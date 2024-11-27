// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// const Login = () => {
//   const [emailId, setEmailId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();  // Initialize navigate

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userData = { emailId, password };

//     try {
//       const response = await axios.post('http://localhost:5000/login', userData);
//       console.log(response.data);

//       // Check if the email matches 'dipashak0505@gmail.com'
//       if (emailId === 'dipashak0505@gmail.com') {
//         navigate('/overview');  // Redirect to overview page
//       } else {
//         navigate('/donor-receiver');  // Redirect to donor-receiver page
//       }

//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data.message || 'Invalid credentials.');
//       } else if (error.request) {
//         setError('No response from server.');
//       } else {
//         setError('Error in form submission.');
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-3">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
//           Login to Your Account
//         </h2>
//         {error && (
//           <p className="text-sm text-red-500 text-center mb-3">{error}</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={emailId}
//               onChange={(e) => setEmailId(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               required
//             />
//           </div>
//           <div className="mt-4">
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don't have an account?{' '}
//           <a
//             href="/signup"
//             className="text-blue-500 hover:underline font-medium"
//           >
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;












import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { emailId, password };

    try {
      const response = await axios.post('http://localhost:5000/login', userData);
      console.log(response.data);

      // Save the logged-in email in localStorage
      localStorage.setItem('userEmail', emailId);

      // Check if the email matches 'dipashak0505@gmail.com'
      if (emailId === 'dipashak0505@gmail.com') {
        navigate('/overview');  // Redirect to overview page
      } else {
        navigate('/donor-receiver');  // Redirect to donor-receiver page
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Invalid credentials.');
      } else if (error.request) {
        setError('No response from server.');
      } else {
        setError('Error in form submission.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-3">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Login to Your Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center mb-3">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
