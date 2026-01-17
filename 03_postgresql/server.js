import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";
import { asc, eq } from "drizzle-orm";

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello from Car API!");
});

// GET /cars
router.get("/", async (req, res) => {
	const allCars = await db.select().from(cars).orderBy(asc(cars.id));
	res.json(allCars);
});

// GET CARS by ID
router.get("/:id", async (req, res) => {
	const carId = parseInt(req.params.id);
	const car = await db.select().from(cars).where(eq(cars.id, carId));
	if (car.length === 0) {
		return res.status(404).json({ error: "Car not found" });
	}
	res.json(car);
});

// POST /cars
router.post("/", async (req, res) => {
	const { make, model, year, price } = req.body;

	if (!make || !model || !year || !price) {
		return res.status(400).json({
			error: "Please provide make, model, year, and price",
		});
	}

	const [newCar] = await db
		.insert(cars)
		.values({ make, model, year, price })
		.returning();

	res.status(201).json(newCar);
});

// UPDATE /cars
router.put("/:id", async (req, res) => {
	const carId = parseInt(req.params.id);
	const { make, model, year, price } = req.body;

	const car = await db.select().from(cars).where(eq(cars.id, carId));

	if (car.length == 0) {
		return res.status(404).json({ error: "Car not found" });
	}

	const [updatedCar] = await db
		.update(cars)
		.set({ make, model, year, price })
		.where(eq(cars.id, carId))
		.returning();

	res.json(updatedCar);
});

// DELETE /cars
router.delete("/:id", async (req, res) => {
	const carId = parseInt(req.params.id);
	const car = await db.select().from(cars).where(eq(cars.id, carId));

	if (car.length === 0) {
		return res.status(404).json({ error: "Car not found" });
	}

	await db.delete(cars).where(eq(cars.id, carId));
	res.send(`Car with ID ${carId} has been deleted.`);
});

app.use("/cars", router);

app.use((err, req, res, next) => {
	console.error("Error:", err.message);
	res.status(500).json({
		error: "Something went wrong!",
		message: err.message,
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
