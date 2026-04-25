const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products',   require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/cart',       require('./routes/cart.routes'));
app.use('/api/orders',     require('./routes/order.routes'));
app.use('/api/reviews',    require('./routes/review.routes'));
app.use('/api/auth',       require('./routes/auth.routes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => console.error(err));