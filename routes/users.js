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

router.post('/carvalue', async (req, res, next) => {
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


const riskRating = async (req, res) => {
  const { claim_history } = req.body;
  if (!claim_history) {
    return res.status(400).json({ error: "Claim history is required in the input." });
  }
  const calculatedRiskRating = calculateRiskRating(claim_history);
  if (calculatedRiskRating === -1) {
    return res.status(400).json({ error: "There is an error in the input value." });
  } 
  
  try {   
    res.send({ risk_rating: calculatedRiskRating }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function calculateRiskRating(claimHistory) {
  const keywords = ["collide", "crash", "scratch", "bump", "smash"];
  const lowerCaseClaimHistory = claimHistory.toLowerCase();
  let riskRating = 0;
  keywords.forEach((keyword) => {
    const occurrences = (lowerCaseClaimHistory.match(new RegExp(keyword, "g")) || []).length;
    riskRating += occurrences;
  });
  if (riskRating === 0) {
    return -1;
  }
  return riskRating;
}


router.post('/riskrating', riskRating);

router.post('/quote', async function(req, res, next) {
  const { car_value, risk_rating } = req.body;

  // Validation
  if (!car_value || !risk_rating || isNaN(car_value) || isNaN(risk_rating) || car_value < 1 || risk_rating < 1 || risk_rating > 5) {
    return res.status(400).json({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });
  }

  const yearlyPremium = Math.floor(car_value * risk_rating / 100);
  const monthlyPremium = parseFloat((yearlyPremium / 12).toFixed(1));

  try {
    res.send({ monthly_premium: monthlyPremium, yearly_premium: yearlyPremium });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
