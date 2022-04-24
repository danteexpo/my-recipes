import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);

	const postData = postData => {
		setOptions({
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
	};

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async fetchOptions => {
			setIsPending(true);

			try {
				const res = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
				// console.log(res);
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const data = await res.json();

				setIsPending(false);
				setData(data);
				setError(null);
			} catch (err) {
				if (err.name === "AbortError") {
					console.log("the fetch was aborted");
				} else {
					setIsPending(false);
					setError("Could not fetch the data");
				}
			}
		};

		if (method === "GET") {
			fetchData();
		}

		if (method === "POST" && options) {
			fetchData(options);
		}

		return () => {
			controller.abort();
		};
	}, [url, method, options]);

	return { data, isPending, error, postData };
};

// Todo lo de controller está para el caso en el que nuestro componente se desmonte antes
// de terminar el fetch y para cuando este se termine, quiera actualizar el estado...
// El problema es que react no puede cambiar el estado en un componente desmontado.
