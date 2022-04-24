import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ThemeSelector } from "./components/ThemeSelector/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
import Create from "./pages/Create/Create";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

function App() {
	const { mode } = useTheme();

	const body = document.querySelector("body");

	if (mode === "dark") {
		body.classList.add("dark");
	} else {
		body.classList.remove("dark");
	}

	return (
		<Router>
			<Navbar />
			<ThemeSelector />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="details/:id" element={<Details />} />
				<Route path="create" element={<Create />} />
				<Route path="search" element={<Search />} />
			</Routes>
		</Router>
	);
}

export default App;
