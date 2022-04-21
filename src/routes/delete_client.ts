import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.delete("/api/client/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });

    if (!client) {
      return res.json({
        msg: "client not found",
      });
    }

    const response = await Client.delete({ id: parseInt(clientId) });

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
});

export { router as deleteClientRouter };
