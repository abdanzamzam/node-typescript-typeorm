import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  try {
    const client = await Client.find();

    return res.json(client);
  } catch (error) {
    return res.json(error.message);
  }
});

router.get("/api/client/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await createQueryBuilder("client")
      .select("client.first_name")
      .addSelect("client.balance")
      .from(Client, "client")
      .leftJoinAndSelect("client.transactions", "transactions")
      .where("client.id = :id", { id: parseInt(clientId) })
      .getOne();

    return res.json(client);
  } catch (error) {
    return res.json(error.message);
  }
});

export { router as fetchClientsRouter };
