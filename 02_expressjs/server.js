import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	res.send("Hello from cars API using Express.js!");
});

app.get("/cars", (req, res) => {
	res.send("Here is the list of cars.");
});

app.post("/cars", (req, res) => {
	res.send("A new car has been added.");
});

app.put("/cars/:id", (req, res) => {
	res.send(`Car with ID ${req.params.id} has been updated.`);
});

app.delete("/cars/:id", (req, res) => {
	res.send(`Car with ID ${req.params.id} has been deleted.`);
});

app.get("/cars/:id", (req, res) => {
	res.send(`Details of car with ID ${req.params.id}.`);
});

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
