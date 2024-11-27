import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrganDonorManager = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({
    organ: '',
    donorName: '',
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

    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donor');
      setDonors(response.data);
    } catch (error) {
      toast.error('Error fetching donors.');
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const addOrUpdateDonor = async () => {
    const { donorName, phone, email, gender, organ, bloodGroup } = newDonor;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (email !== localEmail) {
      toast.error('You are only allowed to add donors with your email.');
      return;
    }

    if (!donorName || !phone || !gender || !organ || !bloodGroup) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      if (newDonor.id) {
        await axios.put(`http://localhost:5000/api/donor/${newDonor.id}`, newDonor);
        toast.success('Donor updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/donor', newDonor);
        toast.success('Donor added successfully!');
      }
      fetchDonors(); // Refresh the donor list
      resetForm();
    } catch (error) {
      toast.error('Error saving donor.');
      console.error(error);
    }

    setIsModalOpen(false);
  };

  const editDonor = (donor) => {
    setNewDonor(donor);
    setIsModalOpen(true);
    setEmailError('');
  };

  const deleteDonor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/donor/${id}`);
      setDonors(donors.filter((donor) => donor._id !== id));
      toast.success('Donor deleted successfully!');
    } catch (error) {
      toast.error('Error deleting donor.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setNewDonor({
      organ: '',
      donorName: '',
      phone: '',
      email: '',
      gender: '',
      bloodGroup: '',
      id: null, // Reset ID for new donors
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
          <h1 className="text-white text-xl font-bold">Organ Donor Manager</h1>
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
          <h1 className="text-white text-3xl font-bold text-center mb-6">Organ Donor Manager</h1>
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
            Add Donor
          </button>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full text-left bg-gray-800 text-gray-300">
            <thead>
              <tr>
                <th className="border-b border-gray-600 px-2 py-2">#</th>
                <th className="border-b border-gray-600 px-2 py-2">Donor Name</th>
                <th className="border-b border-gray-600 px-2 py-2">Phone</th>
                <th className="border-b border-gray-600 px-2 py-2">Email</th>
                <th className="border-b border-gray-600 px-2 py-2">Organ</th>
                <th className="border-b border-gray-600 px-2 py-2">Blood Group</th>
                <th className="border-b border-gray-600 px-2 py-2">Gender</th>
                <th className="border-b border-gray-600 px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id} className="hover:bg-gray-700">
                  <td className="border-b border-gray-600 px-2 py-2">{index + 1}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.donorName}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.phone}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.email}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.organ}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.bloodGroup}</td>
                  <td className="border-b border-gray-600 px-2 py-2">{donor.gender}</td>
                  <td className="border-b border-gray-600 px-2 py-2">
                    <button onClick={() => editDonor(donor)} className="text-blue-500 mx-2">Edit</button>
                    <button onClick={() => deleteDonor(donor._id)} className="text-red-500 mx-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Donor */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg overflow-y-auto">
            <h2 className="text-white text-2xl font-semibold mb-4">
              {newDonor.id ? 'Edit Donor' : 'Add Donor'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-white font-semibold" htmlFor="donorName">Donor Name:</label>
                <input
                  id="donorName"
                  name="donorName"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="text"
                  value={newDonor.donorName}
                  onChange={(e) => setNewDonor({ ...newDonor, donorName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  name="phone"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="text"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  type="email"
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div>
                <label className="text-white font-semibold" htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  className="bg-gray-700 text-white rounded px-3 py-2 w-full"
                  value={newDonor.gender}
                  onChange={(e) => setNewDonor({ ...newDonor, gender: e.target.value })}
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
                  value={newDonor.organ}
                  onChange={(e) => setNewDonor({ ...newDonor, organ: e.target.value })}
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
                  value={newDonor.bloodGroup}
                  onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
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
            </form>
            <div className="mt-4 flex justify-end">
              <button
                onClick={addOrUpdateDonor}
                className="bg-blue-600 text-white rounded px-6 py-2 mr-2"
              >
                Save
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-600 text-white rounded px-6 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default OrganDonorManager;