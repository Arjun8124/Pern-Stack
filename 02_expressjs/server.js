import express from "express";

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.json());

let cars = [
	{ id: 1, make: "Toyota", model: "Camry", year: 2020, price: 24000 },
	{ id: 2, make: "Honda", model: "Accord", year: 2019, price: 22000 },
	{ id: 3, make: "Ford", model: "Mustang", year: 2021, price: 35000 },
	{ id: 4, make: "Chevrolet", model: "Malibu", year: 2018, price: 21000 },
	{ id: 5, make: "Nissan", model: "Altima", year: 2022, price: 26000 },
	{ id: 6, make: "Tesla", model: "Model S", year: 2023, price: 50000 },
	{ id: 7, make: "Tesla", model: "Model 3", year: 2023, price: 35000 },
	{ id: 8, make: "BMW", model: "X5", year: 2023, price: 40000 },
	{ id: 9, make: "BMW", model: "X6", year: 2023, price: 45000 },
	{ id: 10, make: "Audi", model: "A4", year: 2023, price: 42000 },
	{ id: 11, make: "Audi", model: "A5", year: 2023, price: 47000 },
	{ id: 12, make: "Audi", model: "A6", year: 2023, price: 48000 },
	{ id: 13, make: "Audi", model: "A7", year: 2023, price: 49000 },
	{ id: 14, make: "Audi", model: "A8", year: 2023, price: 50000 },
	{ id: 15, make: "Audi", model: "A9", year: 2023, price: 51000 },
	{ id: 16, make: "Mercedes", model: "C-Class", year: 2023, price: 52000 },
	{ id: 17, make: "Mercedes", model: "E-Class", year: 2023, price: 53000 },
	{ id: 18, make: "Mercedes", model: "G-Class", year: 2023, price: 54000 },
	{ id: 19, make: "Mercedes", model: "S-Class", year: 2023, price: 55000 },
	{ id: 20, make: "Mercedes", model: "V-Class", year: 2023, price: 56000 },
];

app.get("/", (req, res) => {
	res.send("Hello from Car API!");
});

router.get("/", (req, res) => {
	res.json(cars);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const car = cars.find((c) => c.id === id);

	if (!car) {
		return res.status(404).json({ error: "Car not found" });
	} else {
		res.json(car);
	}
});

router.post("/", (req, res) => {
	const { id, make, model, year, price } = req.body;

	if (!make || !model || !year || !price) {
		return res.status(400).json({ error: "Missing required fields" });
	} else {
		const newCar = {
			id: id ? id : cars.length + 1,
			make,
			model,
			year,
			price,
		};
		cars.push(newCar);
		res.status(201).json(newCar);
	}
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	if (cars.find((c) => c.id === id) === undefined) {
		return res.status(404).json({ error: "Car not found" });
	}
	const { make, model, year, price } = req.body;
	if (!make || !model || !year || !price) {
		return res.status(400).json({ error: "Missing required fields" });
	} else {
		cars[id - 1].make = make;
		cars[id - 1].model = model;
		cars[id - 1].year = year;
		cars[id - 1].price = price;
		res.json(cars[id - 1]);
	}
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	if (cars.find((c) => c.id === id) === undefined) {
		return res.status(404).json({ error: "Car not found" });
	}
	cars = cars.filter((c) => c.id !== id);
	res.send(`Car with ID ${id} has been deleted.`);
});

app.use("/cars", router);

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
