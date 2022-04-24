import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import Trashcan from "../../assets/delete.svg";
import { projectFirestore } from "../../firebase/config";

const RecipeList = ({ recipes }) => {
	const { mode } = useTheme();

	if (recipes.length === 0) {
		return (
			<div className="text-center my-10 mx-auto">No recipes to load...</div>
		);
	}

	const handleClick = id => {
		projectFirestore.collection("recipes").doc(id).delete();
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] my-10 mx-auto">
			{recipes.map(recipe => (
				<div
					key={recipe.id}
					className={`bg-[#fff] text-[#333] p-5 rounded shadow-md transition-all duration-300 ease-in-out relative hover:rotate-3 ${
						mode === "dark" ? "bg-[#555]" : ""
					}`}
				>
					<h3
						className={`text-2xl font-semibold text-[#555] mb-2 ${
							mode === "dark" ? "text-[#e4e4e4]" : ""
						}`}
					>
						{recipe.title}
					</h3>
					<p
						className={`text-sm text-[#999] ${
							mode === "dark" ? "text-[#e4e4e4]" : ""
						}`}
					>
						{recipe.cookingTime} to make.
					</p>
					<div
						className={`text-sm text-[#555] my-5 mx-auto ${
							mode === "dark" ? "text-[#e4e4e4]" : ""
						}`}
					>
						{recipe.method.substring(0, 100)}...
					</div>
					<Link
						to={`/details/${recipe.id}`}
						className="text-base text-[#555] text-center block bg-[#e2e2e2] w-32 p-2 rounded mt-5 mx-auto"
					>
						Cook This
					</Link>
					<img
						src={Trashcan}
						alt=""
						className="absolute top-2 right-2 cursor-pointer w-6"
						onClick={() => handleClick(recipe.id)}
						style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
					/>
				</div>
			))}
		</div>
	);
};

export default RecipeList;
