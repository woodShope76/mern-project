import express from "express";
import Product from "../model/product.schema.js";
import data from "../utils/products.js";
import dotenv from "dotenv";
import fetch from "node-fetch"; // install with: npm i node-fetch

dotenv.config();

const router = express.Router();

// 🔁 Insert local data once
router.get("/insert-defaults", async (req, res) => {
  try {
    const existing = await Product.find();
    if (existing.length > 0) {
      return res.status(400).json({ message: "Products already exist." });
    }

    const result = await Product.insertMany(data);
    res.status(200).json({ message: `Inserted ${result.length} products.` });
  } catch (err) {
    res.status(500).json({ message: "Insert failed", error: err.message });
  }
});

// ➕ POST: Add from frontend
router.post("/add", async (req, res) => {
  try {
    const products = req.body;
    console.log("Received products:", products);

    const result = await Product.insertMany(products, { ordered: false });
    console.log("Inserted products:", result);

    res.status(200).json({ success: true, inserted: result.length });
  } catch (err) {
    console.error("Insert failed:", err); // 👈 This line shows full error
    res.status(500).json({ success: false, error: err.message });
  }
});


// ✅ FINAL GET route for all products, with optional category filter
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter = {
        category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
      };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all unique categories from products
router.get("/categories", async (req, res) => {
  try {
    const products = await Product.find();
    const categories = [...new Set(products.map((p) => p.category?.trim()))];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🌐 GET: Fetch data.js from private GitHub repo
router.get("/remote-products", async (req, res) => {
  const githubUrl = "https://raw.githubusercontent.com/woodShope76/backend-APIs/main/utils/data.js";

  try {
    const response = await fetch(githubUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: "Failed to fetch from GitHub" });
    }

    const text = await response.text();

    // ⚠️ Converts the JS export to usable data
    const cleaned = text.replace(/export\s+default/, "");
    const remoteData = eval(cleaned); // ✅ safe if you own the file

    res.status(200).json(remoteData);
  } catch (err) {
    res.status(500).json({ message: "GitHub fetch failed", error: err.message });
  }
});


// ... other imports and routes ...

// ✅ PUT: Update stock status of a product
router.put("/:id", async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update stock", details: err.message });
  }
});

// 📦 GET: Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.get("/", async (req, res) => {
//   try {
//     const { category } = req.query;

//     let filter = {};
//     if (category) {
//       filter = {
//         category: { $regex: new RegExp(`^${category.trim()}$`, "i") },
//       };
//     }

//     const products = await Product.find(filter);
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




export default router;
