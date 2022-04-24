import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";

const Home = () => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);
	const { mode } = useTheme();

	useEffect(() => {
		setIsPending(true);
		const unsub = projectFirestore.collection("recipes").onSnapshot(
			snapshot => {
				if (snapshot.empty) {
					setError("No recipes to load");
					setIsPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach(doc => {
						results.push({ id: doc.id, ...doc.data() });
					});
					setData(results);
					setIsPending(false);
				}
			},
			err => {
				setError(err.message);
				setIsPending(false);
			},
		);

		return () => unsub();
	}, []);

	return (
		<div className="max-w-[1200px] my-10 mx-auto text-center">
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

export default Home;
