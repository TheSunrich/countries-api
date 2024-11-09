import express from "express";
import { listCountries, addCountry } from "../controllers/countryController";

const router = express.Router();

router.get("", listCountries);
router.post("", addCountry);

export default router;