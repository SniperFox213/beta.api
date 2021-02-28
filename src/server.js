import sirv from "sirv";
import cors from "cors";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";

import api from "../api/index.js";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

app.use(cors());

// Backend
app.use("/v1", api);

// Frontend
app
	.use(
		compression({ threshold: 0 }),
		sirv("static", { dev }),
		sapper.middleware(),
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});

// Let's now export our app for
// vercel-sapper builder
export default app;