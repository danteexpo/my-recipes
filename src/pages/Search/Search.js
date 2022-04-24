import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

const Search = () => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);
	const { mode } = useTheme();
	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	const query = queryParams.get("q");

	useEffect(() => {
		setIsPending(true);
		const unsub = projectFirestore.collection("recipes").onSnapshot(
			snapshot => {
				if (snapshot.empty) {
					setError("No recipes to load");
					setIsPending(false);
				} else {
					let forEachResults = [];
					let filterResults = [];
					snapshot.docs.forEach(doc => {
						forEachResults.push({ id: doc.id, ...doc.data() });
					});
					filterResults = forEachResults.filter(
						doc =>
							doc.title.includes(
								`${query.charAt(0).toUpperCase() + query.slice(1)}`,
							) ||
							doc.title.includes(
								`${query.charAt(0).toLowerCase() + query.slice(1)}`,
							),
					);
					setData(filterResults);
					setIsPending(false);
				}
			},
			err => {
				setError(err.message);
				setIsPending(false);
			},
		);

		return () => unsub();
	}, [query]);

	return (
		<div>
			<h2
				className={`text-center mt-4 mb-2 mx-auto text-[#333] font-bold text-3xl ${
					mode === "dark" ? "text-[#e4e4e4]" : ""
				}`}
			>
				Recipes including "{query}"
			</h2>
			{error && (
				<p
					className={`text-center my-10 mx-auto ${
						mode === "dark" ? "text-[#ffffff]" : ""
					}`}
				>
					{error}
				</p>
			)}
			{isPending && (
				<p
					className={`text-center my-10 mx-auto ${
						mode === "dark" ? "text-[#ffffff]" : ""
					}`}
				>
					Loading...
				</p>
			)}
			{data && <RecipeList recipes={data} />}
		</div>
	);
};

export default Search;
