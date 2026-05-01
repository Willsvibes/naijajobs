import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosInstance";
import useToastMessage from "../Hooks/useToastMesage";
import {
	User,
	Briefcase,
	Mail,
	Code,
	Building2,
	Save,
	Loader2,
} from "lucide-react";

const Profile = () => {
	const user = useAuthStore((state) => state.user);
	const updateUser = useAuthStore((state) => state.updateUser);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [profileData, setProfileData] = useState<any>(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		skills: "",
		companyName: "",
		bio: "",
	});

	const { toastSuccess, toastError } = useToastMessage();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await api.get("/profile");
				const data = res.data;
				setProfileData(data);
				setForm({
					name: data.name || "",
					email: data.email || "",
					skills: data.skills?.join(", ") || "",
					companyName: data.companyName || "",
					bio: data.bio || "",
				});
			} catch (err: any) {
				console.error(err);
				toastError("Failed to load profile");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			setSaving(true);
			const payload = {
				...form,
				skills: form.skills
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean),
			};

			const res = await api.put("/profile", payload);
			setProfileData(res.data);

			// Keep Zustand store in sync
			if (res.data.name !== user?.name) {
				updateUser({ name: res.data.name });
			}

			toastSuccess("Profile updated successfully!");
		} catch (err: any) {
			console.error(err);
			const message =
				err.response?.data?.message || "Failed to update profile";
			toastError(message);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[60vh]'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500'></div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-6'>
			<div className='max-w-2xl mx-auto'>
				{/* Header */}
				<div className='mb-10'>
					<h1 className='text-3xl font-extrabold text-white tracking-tight'>
						My Profile
					</h1>
					<p className='text-slate-400 mt-2 text-sm'>
						Manage your personal information and preferences.
					</p>
				</div>

				{/* Profile Card */}
				<div className='bg-slate-900/60 rounded-2xl border border-slate-800 p-8 backdrop-blur-sm'>
					{/* Avatar & Role Badge */}
					<div className='flex items-center gap-5 mb-8 pb-8 border-b border-slate-800'>
						<div className='w-16 h-16 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20'>
							<span className='text-2xl font-black text-black'>
								{profileData?.name?.charAt(0)?.toUpperCase() ||
									"?"}
							</span>
						</div>
						<div>
							<h2 className='text-xl font-bold text-white'>
								{profileData?.name}
							</h2>
							<span className='inline-flex items-center gap-1.5 mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20'>
								<Briefcase size={12} />
								{profileData?.role === "employer"
									? "Employer"
									: "Employee"}
							</span>
						</div>
					</div>

					{/* Form Fields */}
					<div className='space-y-6'>
						<div>
							<label className='flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2'>
								<User size={14} /> Full Name
							</label>
							<input
								name='name'
								value={form.name}
								onChange={handleChange}
								className='w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition placeholder-slate-600'
							/>
						</div>

						<div>
							<label className='flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2'>
								<Mail size={14} /> Email
							</label>
							<input
								name='email'
								value={form.email}
								onChange={handleChange}
								className='w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition placeholder-slate-600'
							/>
						</div>

						<div>
							<label className='flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2'>
								Bio
							</label>
							<textarea
								name='bio'
								value={form.bio}
								onChange={handleChange}
								rows={3}
								placeholder='Tell us about yourself...'
								className='w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition placeholder-slate-600 resize-none'
							/>
						</div>

						{/* Role-specific fields */}
						{profileData?.role === "employee" && (
							<div>
								<label className='flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2'>
									<Code size={14} /> Skills
								</label>
								<input
									name='skills'
									value={form.skills}
									onChange={handleChange}
									placeholder='React, Node.js, Figma...'
									className='w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition placeholder-slate-600'
								/>
								<p className='text-xs text-slate-500 mt-1.5'>
									Separate skills with commas
								</p>
							</div>
						)}

						{profileData?.role === "employer" && (
							<div>
								<label className='flex items-center gap-2 text-sm font-semibold text-slate-400 mb-2'>
									<Building2 size={14} /> Company Name
								</label>
								<input
									name='companyName'
									value={form.companyName}
									onChange={handleChange}
									placeholder='Your company name'
									className='w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition placeholder-slate-600'
								/>
							</div>
						)}
					</div>

					{/* Save Button */}
					<div className='mt-8 pt-6 border-t border-slate-800'>
						<button
							onClick={handleSubmit}
							disabled={saving}
							className='w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/15 active:scale-[0.98] disabled:opacity-50'
						>
							{saving ? (
								<>
									<Loader2
										size={18}
										className='animate-spin'
									/>
									Saving...
								</>
							) : (
								<>
									<Save size={18} />
									Save Changes
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
