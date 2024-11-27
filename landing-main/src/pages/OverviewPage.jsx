import { Heart, UserPlus, ShieldCheck, Activity } from "lucide-react"; // Updated icons
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import OrganDonationOverviewChart from "../components/overview/OrganDonationOverview"; // Renamed chart
import DonationCategoryChart from "../components/overview/OrganDonationChart"; // Renamed chart
import DonationSourceChart from "../components/overview/OrganDonationBarChart"; // Renamed chart

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Organ Donation Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Donors' icon={UserPlus} value='8,432' color='#6366F1' />
					<StatCard name='Organs Donated' icon={Heart} value='12,345' color='#8B5CF6' />
					<StatCard name='Successful Transplants' icon={ShieldCheck} value='10,678' color='#10B981' />
					<StatCard name='Success Rate' icon={Activity} value='85.3%' color='#EC4899' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<OrganDonationOverviewChart />
					<DonationCategoryChart />
					<DonationSourceChart />
				</div>
			</main>
		</div>
	);
};

export default OverviewPage;