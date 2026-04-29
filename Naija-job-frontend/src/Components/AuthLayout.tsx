import React from "react";
import { Outlet } from "react-router";
const AuthLayout: React.FC = () => {
	return (
		<div className='bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 h-lvh w-full grid grid-cols-3 place-items-center'>
			<div className="w-full col-span-1 col-start-2">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
