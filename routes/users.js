var express = require('express');
var router = express.Router();

const calculateCarValue = (model, year) => {
  try {
    if (typeof model !== "string" || typeof year !== "number" || isNaN(year)) {
      throw new Error("Invalid input for calculating car value");
    }
    if (year < 0) {
      throw new Error("Year cannot be a negative number");
    }

    const cleanedModel = model.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const charValues = Array.from(cleanedModel).map((char) => char.charCodeAt(0) - 64);
    const carValue = charValues.reduce((sum, value) => sum + value, 0) * 100 + year;

    if (isNaN(carValue)) {
      throw new Error("Unable to calculate car value");
    }

    return carValue;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for higher-level handling
  }
};

router.get('/', async (req, res, next) => {
  try {
    const { model, year } = req.body;
    console.log({ model, year });

    // Validate input data
    if (!model || typeof model !== "string" || !year || isNaN(year)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const carValue = calculateCarValue(model, parseInt(year));

    if (isNaN(carValue)) {
      return res.status(400).json({ error: "Unable to calculate car value" });
    }

    res.send({ car_value: carValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
