import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { Searchbar } from "../Searchbar/Searchbar";

const Navbar = () => {
	const { color } = useTheme();

	return (
		<div className="bg-[#58249c] p-5 text-[#fff]" style={{ background: color }}>
			<nav className="flex flex-col items-center max-w-[1200px] my-0 mx-auto">
				<div className="w-full flex justify-between items-center mb-4 md:mb-0">
					<NavLink to="/" className="mr-auto">
						<h1 className="font-bold text-3xl">My Recipes</h1>
					</NavLink>
					<div className="hidden md:flex md:justify-center">
						<Searchbar />
					</div>
					<NavLink
						to="/create"
						className="hidden sm:block p-2 border-2 border-solid border-[#fff] hover:bg-[#fff] hover:text-[#58249c] transition-all duration-500"
					>
						<p>Create Recipe</p>
					</NavLink>
					<NavLink to="/create" className="sm:hidden">
						<img src="https://i.imgur.com/Vcj61qF.png" alt="" className="w-8" />
					</NavLink>
				</div>

				<div className="w-full flex justify-center md:hidden">
					<Searchbar />
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
