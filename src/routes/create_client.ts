import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body;

    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });

    await client.save();

    return res.json(client);
  } catch (error) {
    return res.json(error.message);
  }
});

export { router as createClientRouter };
