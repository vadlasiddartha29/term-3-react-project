const express = require('express');
const axios = require('axios');
const verifyClerk = require('../middleware/verifyClerk');

const router = express.Router();

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: 'Food query is required.' });
  }

  const API_KEY = process.env.USDA_API_KEY || 'DEMO_KEY';

  try {
    // Use USDA FoodData Central API to get a comprehensive list of related foods
    // This is free and returns multiple detailed items instantly
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search`,
      {
        params: {
          api_key: API_KEY,
          query: query,
          pageSize: 20 // Return up to 20 items so the user gets everything related
        },
        timeout: 10000,
      }
    );

    const foods = response.data.foods;
    console.log(`[USDA API] Found ${foods?.length || 0} results for "${query}"`);
    if (foods && foods.length > 0) {
      console.log('[USDA Sample Item]', foods[0].description, foods[0].foodNutrients?.slice(0, 3));
    }
    if (!foods || foods.length === 0) {
      return res.status(404).json({ error: 'No nutritional data found for this food.' });
    }

    const results = foods.map(food => {
      const nMap = {};
      if (food.foodNutrients) {
        food.foodNutrients.forEach(n => {
          nMap[n.nutrientName] = n.value;
        });
      }

      return {
        name: food.description.toLowerCase(),
        brandName: food.brandName || null,
        servingQty: food.servingSize || 100,
        servingUnit: food.servingSizeUnit || 'g',
        servingWeightGrams: food.servingSizeUnit === 'g' ? food.servingSize : null,
        calories: Math.round(nMap['Energy'] || 0),
        protein: +(nMap['Protein'] || 0).toFixed(1),
        carbs: +(nMap['Carbohydrate, by difference'] || 0).toFixed(1),
        fat: +(nMap['Total lipid (fat)'] || 0).toFixed(1),
        fiber: +(nMap['Fiber, total dietary'] || 0).toFixed(1),
        sugar: +(nMap['Total Sugars'] || nMap['Sugars, total including NLEA'] || 0).toFixed(1),
        sodium: +(nMap['Sodium, Na'] || 0).toFixed(0),
        potassium: +(nMap['Potassium, K'] || 0).toFixed(0),
        saturatedFat: +(nMap['Fatty acids, total saturated'] || 0).toFixed(1),
        cholesterol: +(nMap['Cholesterol'] || 0).toFixed(0),
        vitamins: {
          vitaminA: +(nMap['Vitamin A, IU'] || nMap['Vitamin A, RAE'] || 0).toFixed(0),
          vitaminC: +(nMap['Vitamin C, total ascorbic acid'] || 0).toFixed(1),
          vitaminD: +(nMap['Vitamin D (D2 + D3)'] || 0).toFixed(1),
          vitaminE: +(nMap['Vitamin E (alpha-tocopherol)'] || 0).toFixed(1),
          vitaminK: +(nMap['Vitamin K (phylloquinone)'] || 0).toFixed(1),
          calcium: +(nMap['Calcium, Ca'] || 0).toFixed(0),
          iron: +(nMap['Iron, Fe'] || 0).toFixed(1),
        },
        thumbnail: null,
        highResPhoto: null,
      };
    });

    return res.json({ foods: results, total: results.length });

  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Food not found. Try a different search term.' });
    }
    console.error('[Nutrition Route Error]', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ 
      error: 'Failed to fetch nutrition data. Please try again.',
      details: err.response?.data || err.message
    });
  }
});

module.exports = router;
