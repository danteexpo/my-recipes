import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "./../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

const Details = () => {
	const { id } = useParams();
	const { mode } = useTheme();
	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);
		const unsub = projectFirestore
			.collection("recipes")
			.doc(id)
			.onSnapshot(doc => {
				if (doc.exists) {
					setRecipe(doc.data());
					setIsPending(false);
				} else {
					setError("Could not find recipe");
					setIsPending(false);
				}
			});

		return () => unsub();
	}, [id]);

	return (
		<div
			className={`max-w-[1000px] my-10 mx-auto text-center bg-[#fff] p-10 ${
				mode === "dark" ? "bg-[#555] text-[#e4e4e4]" : ""
			}`}
		>
			{error && <p className="text-center my-10 mx-auto">{error}</p>}
			{isPending && <p className="text-center my-10 mx-auto">Loading...</p>}
			{recipe && (
				<>
					<h2
						className={`text-center my-10 mx-auto text-[#333] font-bold text-3xl ${
							mode === "dark" ? "text-[#e4e4e4]" : ""
						}`}
					>
						{recipe.title}
					</h2>
					<p className="text-lg">Takes {recipe.cookingTime} to cook.</p>
					<ul className="flex flex-col sm:flex-row p-0 justify-center mt-0">
						{recipe.ingredients.map(ingredient => (
							<li
								key={ingredient}
								className={`mr-2 text-[#777] after:content-[','] last:after:content-['.'] ${
									mode === "dark" ? "text-[#b1b1b1]" : ""
								}`}
							>
								{ingredient}
							</li>
						))}
					</ul>
					<p className="text-left text-base">{recipe.method}</p>
				</>
			)}
		</div>
	);
};

export default Details;
