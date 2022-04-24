import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";

const Create = () => {
	const { mode } = useTheme();
	const [title, setTitle] = useState("");
	const [method, setMethod] = useState("");
	const [cookingTime, setCookingTime] = useState(0);
	const [newIngredient, setNewIngredient] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const ingredientInput = useRef(null);
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		const doc = {
			title,
			ingredients,
			method,
			cookingTime: `${cookingTime} minutes`,
		};

		try {
			await projectFirestore.collection("recipes").add(doc);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const handleAdd = e => {
		e.preventDefault();
		const ing = newIngredient.trim();
		if (ing && !ingredients.includes(ing)) {
			setIngredients(prevIngredients => [...prevIngredients, ing]);
		}
		setNewIngredient("");
		ingredientInput.current.focus();
	};

	return (
		<div className="text-[#555] w-[90%] max-w-[480px] my-16 mx-auto">
			<h2
				className={`text-center my-10 mx-auto text-[#333] font-bold text-3xl ${
					mode === "dark" ? "text-[#e4e4e4]" : ""
				}`}
			>
				Add a New Recipe
			</h2>
			<form
				onSubmit={handleSubmit}
				className={`${mode === "dark" ? "text-[#e4e4e4]" : ""}`}
			>
				<label>
					<span className="block mt-7 mx-0 mb-2 text-lg sm:text-xl">
						Recipe title:
					</span>
					<input
						type="text"
						onChange={e => setTitle(e.target.value)}
						value={title}
						required
						className="w-full py-2 px-2 text-[#333]"
					/>
				</label>

				<label>
					<span className="block mt-7 mx-0 mb-2 text-lg sm:text-xl">
						Recipe ingredients:
					</span>
					<div className="flex justify-between items-center">
						<input
							type="text"
							onChange={e => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
							className="w-[70%] sm:w-[80%] py-2 px-2 text-[#333]"
						/>
						<button
							onClick={handleAdd}
							className="w-[72px] text-base text-[#fff] py-2 px-5 border-0 rounded bg-[#58249c] cursor-pointer"
						>
							Add
						</button>
					</div>
				</label>
				<p className="mt-2">
					Current ingredients:{" "}
					{ingredients.map(i => (
						<em key={i}>{i}, </em>
					))}
				</p>

				<label>
					<span className="block mt-7 mx-0 mb-2 text-lg sm:text-xl">
						Recipe method:
					</span>
					<textarea
						onChange={e => setMethod(e.target.value)}
						value={method}
						required
						className="w-full py-2 px-2 text-[#333]"
					/>
				</label>

				<label>
					<span className="block mt-7 mx-0 mb-2 text-lg sm:text-xl">
						Recipe cooking time (minutes):
					</span>
					<input
						type="number"
						onChange={e => setCookingTime(e.target.value)}
						value={cookingTime}
						required
						className="w-full py-2 px-2 text-[#333]"
					/>
				</label>

				<button className="block w-24 text-base text-[#fff] py-2 px-5 my-5 mx-auto border-0 rounded bg-[#58249c] cursor-pointer">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Create;
