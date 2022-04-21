import express from "express";
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { createBankerRouter } from "./routes/create_banker";
import { createClientRouter } from "./routes/create_client";
import { createTransactionRouter } from "./routes/create_transaction";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchBankersRouter } from "./routes/fetch_banker";
import { fetchClientsRouter } from "./routes/fetch_client";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    console.log("Connected to Postgres");

    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientsRouter);
    app.use(fetchBankersRouter);

    app.listen(8080, () => {
      console.log("Now running on port http://localhost:8080");
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();
