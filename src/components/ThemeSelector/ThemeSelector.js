import { useTheme } from "../../hooks/useTheme";
import Brightness from "../../assets/brightness.svg";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

export const ThemeSelector = () => {
	const { changeColor, changeMode, mode } = useTheme();

	const toggleMode = () => {
		changeMode(mode === "light" ? "dark" : "light");
	};

	return (
		<div className="flex justify-between items-center w-[90%] max-w-[1200px] my-5 mx-auto">
			<div>
				<img
					src={Brightness}
					alt=""
					className="w-6 cursor-pointer"
					onClick={toggleMode}
					style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
				/>
			</div>
			<div>
				{themeColors.map(color => (
					<div
						key={color}
						onClick={() => changeColor(color)}
						style={{ background: color }}
						className="inline-block w-5 h-5 cursor-pointer ml-4 rounded-full"
					/>
				))}
			</div>
		</div>
	);
};
