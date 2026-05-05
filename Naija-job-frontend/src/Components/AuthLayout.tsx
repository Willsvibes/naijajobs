import React from "react";
import { Outlet } from "react-router";
const AuthLayout: React.FC = () => {
	return (
		<div className='min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 md:p-8 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'>
			{/* Decorative background element */}
			<div className="fixed inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
			
			<div className="w-full max-w-md relative z-10">
				<div className="flex justify-center mb-8">
					{/* Logo could go here if needed */}
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
