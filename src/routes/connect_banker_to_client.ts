import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  try {
    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({ where: { id: parseInt(clientId) } });
    const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

    if (!banker || !client) {
      return res.json({
        msg: "Banker or client not found",
      });
    }

    banker.clients = [client];
    await banker.save();

    return res.json({
      msg: "Banker connected to client",
    });
  } catch (error) {
    return res.json(error.message);
  }
});

export { router as connectBankerToClientRouter };
