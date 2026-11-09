import { Router } from "express";

import api from "./routes/api";
import apiDocs from "./config/swagger";

const router = Router();

// router.use("/api-docs", <api docs>);
router.use("/api-docs", apiDocs.serve, apiDocs.setup(apiDocs.spec));

router.use("/ping", (_, res) => {
  res.send("pong");
});

router.use("/api", api);

// router.use("/upload", <upload function>);

export default router;

//routes controller
