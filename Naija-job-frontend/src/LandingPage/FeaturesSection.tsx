import { motion } from "framer-motion";
import { Search, Shield, Zap, Globe, Target, BarChart3 } from "lucide-react";
// correct all the errors
const features = [
	{
		icon: Search,
		title: "Smart Search",
		description:
			"AI-powered matching connects you with opportunities that fit your skills and experience perfectly.",
		accent: "from-blue-400 to-cyan-400",
	},
	{
		icon: Shield,
		title: "Verified Employers",
		description:
			"Every employer is vetted. No scams. No ghosts. Only real companies with real opportunities.",
		accent: "from-emerald-400 to-green-400",
	},
	{
		icon: Zap,
		title: "Instant Apply",
		description:
			"One-tap applications. Your profile does the talking — apply to hundreds of jobs in minutes.",
		accent: "from-amber-400 to-orange-400",
	},
	{
		icon: Globe,
		title: "Remote Friendly",
		description:
			"Find remote roles from top Nigerian and international companies. Work from anywhere.",
		accent: "from-purple-400 to-pink-400",
	},
	{
		icon: Target,
		title: "Role-Based Dashboard",
		description:
			"Whether you're hiring or job-hunting, get a dashboard built specifically for your workflow.",
		accent: "from-rose-400 to-red-400",
	},
	{
		icon: BarChart3,
		title: "Track Applications",
		description:
			"Monitor your applications in real-time. Know exactly where you stand at every stage.",
		accent: "from-indigo-400 to-blue-400",
	},
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.08 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
	},
};

const FeaturesSection = () => {
	return (
		<section id='features' className='relative py-32 overflow-hidden'>
			{/* Background */}
			<div className='absolute inset-0'>
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]' />
			</div>

			<div className='relative max-w-6xl mx-auto px-6 lg:px-8'>
				{/* Section Header */}
				<div className='text-center mb-20'>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='text-[13px] font-semibold text-amber-400 uppercase tracking-[0.2em] mb-4'
					>
						Built Different
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-4xl md:text-5xl font-extrabold tracking-[-0.02em] mb-6'
					>
						Everything you need.
						<br />
						<span className='text-white/30'>
							Nothing you don't.
						</span>
					</motion.h2>
				</div>

				{/* Features Grid */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.2 }}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
				>
					{features.map((feature) => (
						<motion.div
							key={feature.title}
							variants={itemVariants}
							className='group relative p-7 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/1 transition-all duration-500 cursor-default'
						>
							{/* Icon */}
							<div
								className={`w-11 h-11 rounded-xl bg-linear-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}
							>
								<feature.icon
									size={20}
									className='text-black'
								/>
							</div>

							<h3 className='text-[16px] font-semibold text-white mb-2 tracking-[-0.01em]'>
								{feature.title}
							</h3>
							<p className='text-[14px] text-white/30 leading-relaxed'>
								{feature.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturesSection;
