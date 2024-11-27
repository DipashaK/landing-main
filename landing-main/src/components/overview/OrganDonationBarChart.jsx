// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import {
// 	BarChart,
// 	Bar,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	ResponsiveContainer,
// 	Legend,
// 	Cell,
// } from "recharts";

// const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// const OrganDonationBarChart = () => {
// 	const [organData, setOrganData] = useState([]);

// 	// Fetch data from both the donor and receiver APIs
// 	useEffect(() => {
// 		const fetchOrganData = async () => {
// 			try {
// 				// Fetch donors and receivers data from their respective APIs
// 				const [donorsResponse, receiversResponse] = await Promise.all([
// 					axios.get("http://localhost:5000/api/donor"),   // Modify with actual donors API endpoint
// 					axios.get("http://localhost:5000/api/receivers"), // Modify with actual receivers API endpoint
// 				]);

// 				// Process the data
// 				const data = processOrganData(donorsResponse.data, receiversResponse.data);
// 				setOrganData(data);
// 			} catch (error) {
// 				console.error("Error fetching organ data:", error);
// 			}
// 		};

// 		fetchOrganData();
// 	}, []);

// 	// Process donor and receiver data to match the chart's format
// 	const processOrganData = (donors, receivers) => {
// 		const organTypes = ["Kidneys", "Liver", "Heart", "Lungs", "Pancreas"];
// 		const result = organTypes.map((organ) => ({
// 			name: organ,
// 			donors: 0,
// 			receivers: 0,
// 		}));

// 		// Add donor data
// 		donors.forEach((donor) => {
// 			const organIndex = organTypes.indexOf(donor.organ);
// 			if (organIndex !== -1) {
// 				result[organIndex].donors += 1; // Increment donor count
// 			}
// 		});

// 		// Add receiver data
// 		receivers.forEach((receiver) => {
// 			const organIndex = organTypes.indexOf(receiver.organ);
// 			if (organIndex !== -1) {
// 				result[organIndex].receivers += 1; // Increment receiver count
// 			}
// 		});

// 		// Format the data for the Bar chart (donors + receivers)
// 		return result.map((organ) => ({
// 			name: organ.name,
// 			value: organ.donors + organ.receivers, // Total donations (donors + receivers)
// 		}));
// 	};

// 	return (
// 		<motion.div
// 			className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.4 }}
// 		>
// 			<h2 className="text-lg font-medium mb-4 text-gray-100">Organ Donations by Type</h2>

// 			<div className="h-80">
// 				<ResponsiveContainer>
// 					<BarChart data={organData}>
// 						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
// 						<XAxis dataKey="name" stroke="#9CA3AF" />
// 						<YAxis stroke="#9CA3AF" />
// 						<Tooltip
// 							contentStyle={{
// 								backgroundColor: "rgba(31, 41, 55, 0.8)",
// 								borderColor: "#4B5563",
// 							}}
// 							itemStyle={{ color: "#E5E7EB" }}
// 						/>
// 						<Legend />
// 						<Bar dataKey="value" fill="#8884d8">
// 							{organData.map((entry, index) => (
// 								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// 							))}
// 						</Bar>
// 					</BarChart>
// 				</ResponsiveContainer>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default OrganDonationBarChart;












import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
	Cell,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const OrganDonationBarChart = () => {
	const [organData, setOrganData] = useState([]);

	// Fetch data from both the donor and receiver APIs
	useEffect(() => {
		const fetchOrganData = async () => {
			try {
				// Fetch donors and receivers data from their respective APIs
				const [donorsResponse, receiversResponse] = await Promise.all([
					axios.get("http://localhost:5000/api/donor"),   // Modify with actual donors API endpoint
					axios.get("http://localhost:5000/api/receivers"), // Modify with actual receivers API endpoint
				]);

				// Process the data
				const data = processOrganData(donorsResponse.data, receiversResponse.data);
				console.log("Processed Organ Data:", data);  // Log processed data for debugging
				setOrganData(data);
			} catch (error) {
				console.error("Error fetching organ data:", error);
			}
		};

		fetchOrganData();
	}, []);

	// Process donor and receiver data to match the chart's format
	const processOrganData = (donors, receivers) => {
		const organTypes = ["Kidneys", "Liver", "Heart", "Lungs", "Pancreas"];
		const result = organTypes.map((organ) => ({
			name: organ,
			donors: 0,
			receivers: 0,
		}));

		// Add donor data
		donors.forEach((donor) => {
			const organIndex = organTypes.indexOf(donor.organ);
			if (organIndex !== -1) {
				result[organIndex].donors += 1; // Increment donor count
			}
		});

		// Add receiver data
		receivers.forEach((receiver) => {
			const organIndex = organTypes.indexOf(receiver.organ);
			if (organIndex !== -1) {
				result[organIndex].receivers += 1; // Increment receiver count
			}
		});

		console.log("Result Data after Processing:", result);  // Log processed result for debugging
		// Return the processed data with separate donor and receiver values
		return result;
	};

	return (
		<motion.div
			className="bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">Organ Donations by Type</h2>

			<div className="h-80">
				<ResponsiveContainer>
					<BarChart data={organData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="name" stroke="#9CA3AF" />
						<YAxis stroke="#9CA3AF" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey="donors" fill="#6366F1">
							{organData.map((entry, index) => (
								<Cell key={`donors-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
						<Bar dataKey="receivers" fill="#EC4899">
							{organData.map((entry, index) => (
								<Cell key={`receivers-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default OrganDonationBarChart;
