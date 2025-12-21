import express from "express";
import { MetricController } from "../controllers/MetricController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Metric and statistics endpoints
 */
const Metric = express.Router();
const metricController = new MetricController();

// GET - Project Statistics

/**
 * @swagger
 * /projects/{id}/statistics:
 *   get:
 *     summary: Get project statistics
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project statistics
 *       401:
 *         description: Unauthorized
 */
Metric.get("/projects/:id/statistics", AuthMiddleware.verifyAccessToken, metricController.getProjectStatistics);

export default Metric;
