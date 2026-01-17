import { useEffect, useState } from "react";
import Car from "./components/Car";

export default function App() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("/cars");
				if (!response.ok) throw new Error("Failed to retrieve the data!");
				const data = await response.json();
				setCars(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	console.log(cars);

	return (
		<>
			<h1 className="text-4xl text-center font-bold">
				Welcome to my Car Store!
			</h1>
			<ul>
				{cars.map((car) => (
					<Car loading={loading} error={error} key={car.id} {...car} />
				))}
			</ul>
		</>
	);
}
