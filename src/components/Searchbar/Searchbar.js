import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Searchbar = () => {
	const [term, setTerm] = useState("");
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		navigate(`/search?q=${term}`);
	};

	return (
		<div className="w-[90%] max-w-[320px]">
			<form onSubmit={handleSubmit} className="flex items-center">
				<label htmlFor="search">Search: </label>
				<input
					type="text"
					id="search"
					onChange={e => setTerm(e.target.value)}
					value={term}
					className="ml-2 w-full text-[#000] p-1"
					required
				/>
			</form>
		</div>
	);
};
