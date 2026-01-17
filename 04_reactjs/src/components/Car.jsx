export default function Car({ make, model, year, price, loading, error }) {
	return (
		<>
			{loading && console.log("Loading...")}
			{error && "Error: " + error}
			{!loading && !error && (
				<li>
					<h2>Make : {make}</h2>
					<h3>Model : {model}</h3>
					<p>Year : {year}</p>
					<p>Price : {price}</p>
				</li>
			)}
		</>
	);
}
