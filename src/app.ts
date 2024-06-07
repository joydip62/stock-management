// app.ts
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { OrderRoutes } from "./app/modules/order/order.route";
import { ProductRoutes } from "./app/modules/product/product.route";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome Developers !!!");
});


// Use the product routes
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);


app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
export default app;
