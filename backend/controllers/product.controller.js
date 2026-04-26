const Product = require('../models/product.model');

// exports.getProducts = async (req, res) => {
//   try {
//     const { category, minPrice, maxPrice, search, sort } = req.query;
//     let filter = {};

//     if (category)  filter.category = category;
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }
//     if (search) filter.name = { $regex: search, $options: 'i' };

//     let query = Product.find(filter).populate('category');
//     if (sort === 'price_asc')  query = query.sort({ price:  1 });
//     if (sort === 'price_desc') query = query.sort({ price: -1 });
//     if (sort === 'rating')     query = query.sort({ ratings: -1 });

//     const products = await query;
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getProducts = async (req, res) => {
  try {
    const {
      category, minPrice, maxPrice,
      search, sort, minRating,
      page = 0, size = 10
    } = req.query;

    let filter = {};

    // Name search
    if (search)
      filter.name = { $regex: search, $options: 'i' };

    // Category filter
    if (category)
      filter.category = category;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (minRating)
      filter.ratings = { $gte: Number(minRating) };

    // Sort
    let sortObj = {};
    if (sort === 'price_asc')  sortObj = { price:   1 };
    if (sort === 'price_desc') sortObj = { price:  -1 };
    if (sort === 'rating')     sortObj = { ratings: -1 };
    if (sort === 'newest')     sortObj = { createdAt: -1 };

    const pageNum  = Number(page);
    const pageSize = Number(size);
    const skip     = pageNum * pageSize;

    // Get total count + paginated results in parallel
    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
             .populate('category')
             .sort(sortObj)
             .skip(skip)
             .limit(pageSize)
    ]);

    // Return { products, total } — frontend expects this
    res.json({ products, total });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};