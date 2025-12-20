import express from "express";
import { MetricController } from "../controllers/MetricController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const Metric = express.Router();
const metricController = new MetricController();

// GET - Project Statistics
Metric.get("/projects/:id/statistics", AuthMiddleware.verifyAccessToken, metricController.getProjectStatistics);

export default Metric;
