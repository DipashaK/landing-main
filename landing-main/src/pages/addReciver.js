import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrganReceiverManager = () => {
  const [receivers, setReceivers] = useState([]);
  const [newReceiver, setNewReceiver] = useState({
    organ: '',
    receiverName: '',
    phone: '',
    email: '',
    gender: '',
    bloodGroup: '',
    id: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [localEmail, setLocalEmail] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the email from local storage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setLocalEmail(storedEmail); // Set the email in state
    } else {
      toast.error('No email found in local storage.');
      navigate('/login'); // Redirect to login page if email is not found
    }

    fetchReceivers();
  }, []);

  const fetchReceivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/receivers');
      setReceivers(response.data);
    } catch (error) {
      toast.error('Error fetching receivers.');
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const addOrUpdateReceiver = async () => {
    const { receiverName, phone, email, gender, organ, bloodGroup } = newReceiver;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (email !== localEmail) {
      toast.error('You are only allowed to add receivers with your email.');
      return;
    }

    if (!receiverName || !phone || !gender || !organ || !bloodGroup) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      if (newReceiver.id) {
        await axios.put(`http://localhost:5000/api/receivers/api/receiver/${newReceiver.id}`, newReceiver);
        toast.success('Receiver updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/receivers', newReceiver);
        toast.success('Receiver added successfully!');
      }
      fetchReceivers(); // Refresh the receiver list
      resetForm();
    } catch (error) {
      toast.error('Error saving receiver.');
      console.error(error);
    }

    setIsModalOpen(false);
  };

  const editReceiver = (receiver) => {
    setNewReceiver(receiver);
    setIsModalOpen(true);
    setEmailError('');
  };

  const deleteReceiver = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/receivers/${id}`);
      setReceivers(receivers.filter((receiver) => receiver._id !== id));
      toast.success('Receiver deleted successfully!');
    } catch (error) {
      toast.error('Error deleting receiver.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewReceiver({
      organ: '',
      receiverName: '',
      phone: '',
      email: '',
      gender: '',
      bloodGroup: '',
      id: null, // Reset ID for new receivers
    });
    setIsModalOpen(false);
    setEmailError('');
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data if needed
    localStorage.removeItem('userEmail');
    toast.success('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="bg-gray-900 min-h-screen p-5">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Organ Receiver Manager</h1>
          <div className="flex space-x-4">
            <button
              type="button"
              className="bg-red-600 text-white rounded px-3 py-1.5 text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Organ Receiver Manager</h1>
        </div>

        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="bg-blue-600 text-white rounded px-3 py-1.5 text-sm"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Add Receiver
          </button>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full text-left bg-gray-800 text-gray-300">
            <thead>
              <tr>
                <th className="border-b border-gray-600 px-2 py-2">#</th>
                <th className="border-b border-gray-600 px-2 py-2">Receiver Name</th>
                <th className="border-b border-gray-600 px-2 py-2">Phone</th>
                <th className="border-b border-gray-600 px-2 py-2">Email</th>
                <th className="border-b border-gray-600 px-2 py-2">Organ</th>
                <th className="border-b border-gray-600 px-2 py-2">Blood Group</th>
                <th className="border-b border-gray-600 px-2 py-2">Gender</th>
                <th className="border-b border-gray-600 px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map((receiver, index) => (
                <tr key={receiver._id} className="hover:bg-gray-700">
                  <td className="border-b border-gray-600 px-2 py-2">{index + 1}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.receiverName}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.phone}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.email}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.organ}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.bloodGroup}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{receiver.gender}</td>
                  <td className="border-b border-gray-600 px-2 py-2">
                    <button onClick={() => editReceiver(receiver)} className="text-blue-500 mx-2">Edit</button>
                    <button onClick={() => deleteReceiver(receiver._id)} className="text-red-500 mx-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Receiver */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg overflow-y-auto">
            <h2 className="text-white text-2xl font-semibold mb-4">
              {newReceiver.id ? 'Edit Receiver' : 'Add Receiver'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-white font-semibold" htmlFor="receiverName">Receiver Name:</label>
                <input
                  id="receiverName"
                  name="receiverName"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="text"
                  value={newReceiver.receiverName}
                  onChange={(e) => setNewReceiver({ ...newReceiver, receiverName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  name="phone"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="text"
                  value={newReceiver.phone}
                  onChange={(e) => setNewReceiver({ ...newReceiver, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="email"
                  value={newReceiver.email}
                  onChange={(e) => setNewReceiver({ ...newReceiver, email: e.target.value })}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  value={newReceiver.gender}
                  onChange={(e) => setNewReceiver({ ...newReceiver, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="organ">Organ:</label>
                <select
                  id="organ"
                  name="organ"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  value={newReceiver.organ}
                  onChange={(e) => setNewReceiver({ ...newReceiver, organ: e.target.value })}
                >
                  <option value="">Select Organ</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Liver">Liver</option>
                  <option value="Heart">Heart</option>
                  <option value="Brain">Brain</option>
                  <option value="Pancreas">Pancreas</option>
                </select>
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="bloodGroup">Blood Group:</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  value={newReceiver.bloodGroup}
                  onChange={(e) => setNewReceiver({ ...newReceiver, bloodGroup: e.target.value })}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-600 text-white rounded px-6 py-2"
                  onClick={addOrUpdateReceiver}
                >
                  {newReceiver.id ? 'Save Changes' : 'Add Receiver'}
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white rounded px-6 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default OrganReceiverManager;
