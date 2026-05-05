import React, { useState } from "react";
import type { Job } from "../types/job";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router";
import {
	Plus,
	Briefcase,
	Users,
	BarChart3,
	Search,
	TrendingUp,
	Clock,
} from "lucide-react";

interface Props {
	jobs: Job[];
	onRefresh?: () => void;
}

const StatCard = ({ label, value, icon: Icon, trend, color }: any) => (
	<div className='bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 group'>
		<div className='flex justify-between items-start mb-4'>
			<div
				className={`p-3 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 group-hover:border-amber-500/30 transition-colors`}
			>
				<Icon
					size={24}
					className={
						color === "amber"
							? "text-amber-400"
							: "text-slate-400 group-hover:text-amber-400 transition-colors"
					}
				/>
			</div>
			{trend && (
				<span className='flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full'>
					<TrendingUp size={12} />
					{trend}
				</span>
			)}
		</div>
		<h3 className='text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider'>
			{label}
		</h3>
		<p className='text-3xl font-bold text-white tracking-tight'>{value}</p>
	</div>
);

const EmployerDashboard: React.FC<Props> = ({ jobs, onRefresh }) => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const handleCreateJob = () => navigate("/post");

	const filteredJobs = jobs.filter(
		(job) =>
			job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.company.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const totalMonthlyPay = jobs.reduce((sum, job) => sum + Number(job.pay), 0);
	const fullTimeCount = jobs.filter(
		(j) => j.employmentType === "Full-time",
	).length;

	return (
		<div className='w-full min-h-screen bg-slate-950 pb-20'>
			<div className='fixed inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none'></div>

			<div className='relative px-8 max-w-7xl mx-auto pt-10'>
				{/* Header Section */}
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
					<div>
						<h1 className='text-4xl font-extrabold text-white mb-2 bg-linear-to-r from-white via-white to-slate-500 bg-clip-text'>
							Employer Dashboard
						</h1>
						<p className='text-slate-400 text-lg max-w-2xl'>
							Monitor your job listings, track candidate interest,
							and manage your talent pipeline.
						</p>
					</div>

					<button
						onClick={handleCreateJob}
						className='flex items-center justify-center gap-2.5 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-8 py-4 rounded-2xl text-base font-bold text-black transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 whitespace-nowrap'
					>
						<Plus size={20} strokeWidth={2.5} />
						Post New Job
					</button>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
					<StatCard
						label='Total Postings'
						value={jobs.length}
						icon={Briefcase}
						trend='+2 this week'
					/>
					<StatCard
						label='Active Listings'
						value={jobs.length}
						icon={BarChart3}
						color='amber'
					/>
					<StatCard
						label='Full-time Roles'
						value={fullTimeCount}
						icon={Clock}
					/>
					<StatCard
						label='Total Budget'
						value={`₦${(totalMonthlyPay / 1000).toFixed(0)}k`}
						icon={Users}
						color='amber'
					/>
				</div>

				{/* Listings Filter Bar */}
				<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
					<div>
						<h2 className='text-2xl font-bold text-white mb-1 flex items-center gap-3'>
							Your Listings
							<span className='text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20'>
								{filteredJobs.length} active
							</span>
						</h2>
					</div>

					<div className='relative group min-w-[320px]'>
						<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
							<Search
								size={18}
								className='text-slate-500 group-focus-within:text-amber-400 transition-colors'
							/>
						</div>
						<input
							type='text'
							placeholder='Search by title, location or company...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300'
						/>
					</div>
				</div>

				{/* Job Grid */}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredJobs.length > 0 ? (
						filteredJobs.map((job) => (
							<JobCard
								key={job.id}
								job={job}
								onDelete={onRefresh}
							/>
						))
					) : (
						<div className='col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl'>
							<div className='w-20 h-20 rounded-full bg-slate-900/50 flex items-center justify-center mb-6 text-slate-700 border border-slate-800'>
								<Briefcase size={32} />
							</div>
							<h3 className='text-xl font-bold text-white mb-2'>
								No listings found
							</h3>
							<p className='text-slate-500 max-w-sm mx-auto'>
								{searchQuery
									? `We couldn't find any job postings matching "${searchQuery}". Try a different search term.`
									: "You haven't posted any job opportunities yet. Reach thousands of candidates by creating your first listing."}
							</p>
							{!searchQuery && (
								<button
									onClick={handleCreateJob}
									className='mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 group'
								>
									<Plus
										size={18}
										className='group-hover:rotate-90 transition-transform'
									/>
									Post your first job
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployerDashboard;
