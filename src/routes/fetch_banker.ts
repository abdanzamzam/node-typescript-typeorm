import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.get("/api/bankers", async (req, res) => {
  try {
    const bankers = await Banker.find();

    return res.json(bankers);
  } catch (error) {
    return res.json(error.message);
  }
});

export { router as fetchBankersRouter };
