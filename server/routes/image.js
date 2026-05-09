const express = require('express');
const axios = require('axios');
const verifyClerk = require('../middleware/verifyClerk');

const router = express.Router();

// GET /api/image?q=apple
// Returns a high-quality food image from Spoonacular (fallback to Wikipedia)
router.get('/', verifyClerk, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Image query is required.' });
  }

  // We know the user pasted a Spoonacular key in NUTRITIONIX_API_KEY
  const SPOONACULAR_KEY = process.env.NUTRITIONIX_API_KEY;

  try {
    // 1. Try Spoonacular first to get the beautiful cutout images they liked
    if (SPOONACULAR_KEY && !SPOONACULAR_KEY.includes('YOUR_API_KEY')) {
      const spoonResponse = await axios.get('https://api.spoonacular.com/food/ingredients/search', {
        params: {
          query: q,
          number: 1,
          apiKey: SPOONACULAR_KEY
        },
        timeout: 8000
      });

      const results = spoonResponse.data.results;
      if (results && results.length > 0 && results[0].image) {
        const imageName = results[0].image;
        // Spoonacular provides high quality 500x500 ingredient cutouts
        const imageUrl = `https://spoonacular.com/cdn/ingredients_500x500/${imageName}`;
        
        return res.json({
          imageUrl: imageUrl,
          thumbUrl: `https://spoonacular.com/cdn/ingredients_100x100/${imageName}`,
          alt: results[0].name || q,
          credit: {
            photographer: 'Spoonacular',
            profileLink: 'https://spoonacular.com'
          }
        });
      }
    }

    // Extract the primary food name (e.g., "apple juice" from "apple juice, canned or bottled")
    const primarySearchTerm = q.split(',')[0].trim();

    // 2. Wikipedia Free Image Fallback using smart search instead of exact titles
    const wikiResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        generator: 'search',
        gsrsearch: primarySearchTerm,
        gsrlimit: 1,
        prop: 'pageimages',
        format: 'json',
        piprop: 'original|thumbnail',
        pithumbsize: 1000
      },
      headers: {
        'User-Agent': 'NutritionFinderApp/1.0 (contact@example.com)'
      },
      timeout: 8000
    });

    const pages = wikiResponse.data.query?.pages;
    if (pages) {
      const page = Object.values(pages)[0];
      const imageUrl = page?.original?.source || page?.thumbnail?.source || null;

      if (imageUrl) {
        return res.json({
          imageUrl,
          thumbUrl: page?.thumbnail?.source || imageUrl,
          alt: q,
          credit: {
            photographer: 'Wikimedia Commons',
            profileLink: 'https://commons.wikimedia.org/'
          }
        });
      }
    }

    // Give up
    return res.json({ imageUrl: null, alt: q });

  } catch (err) {
    console.error('[Image Route Error]', err.message);
    res.json({ imageUrl: null, alt: q });
  }
});

module.exports = router;
