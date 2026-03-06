require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const rateLimit = require('express-rate-limit');
const app = express();
app.use(cors());
app.use(express.json());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'khejur-ghee-semai', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] }
});
const upload = multer({ storage });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  category: String,
  subCategories: [String],
  rating: { type: Number, default: 4.5 },
  description: String,
  weight: String,
  inStock: { type: Boolean, default: true }
}, { timestamps: true });
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  phone: String,
  address: String,
  orderNotes: String,
  paymentMethod: String,
  shippingMethod: String,
  shippingCost: Number,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  discount: Number,
  total: Number,
  status: { type: String, default: 'Processing' }
}, { timestamps: true });
const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  text: String,
  date: { type: String, default: () => new Date().toLocaleDateString() }
}, { timestamps: true });
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
  expiry: Date,
  active: { type: Boolean, default: true }
});
const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: String,
  subtitle: String,
  link: String,
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});
const siteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed
});
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);
const Coupon = mongoose.model('Coupon', couponSchema);
const Banner = mongoose.model('Banner', bannerSchema);
const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const admin = new User({ name: 'Admin', email: process.env.ADMIN_EMAIL, password: hashedPassword, role: 'admin' });
      await admin.save();
      console.log('Admin user created');
    }
  } catch (err) { console.log(err); }
};
seedAdmin();
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate as admin' });
  }
};
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, phone });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email, phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/user/profile', auth, async (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone });
});
app.get('/api/user/wishlist', auth, async (req, res) => {
  try {
    await req.user.populate('wishlist');
    res.json(req.user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/user/wishlist/:productId', auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    if (req.user.wishlist.includes(productId)) return res.status(400).json({ message: 'Already in wishlist' });
    req.user.wishlist.push(productId);
    await req.user.save();
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/user/wishlist/:productId', auth, async (req, res) => {
  try {
    req.user.wishlist = req.user.wishlist.filter(id => id.toString() !== req.params.productId);
    await req.user.save();
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/upload', adminAuth, upload.single('image'), (req, res) => {
  res.json({ url: req.file.path });
});
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/products', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/products/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/reviews/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/reviews', auth, async (req, res) => {
  try {
    const { productId, rating, text } = req.body;
    const existing = await Review.findOne({ productId, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'You already reviewed this product' });
    const review = new Review({
      productId,
      user: req.user._id,
      name: req.user.name,
      rating,
      text
    });
    await review.save();
    const product = await Product.findById(productId);
    const allReviews = await Review.find({ productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    product.rating = avgRating;
    await product.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/orders/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/orders', auth, async (req, res) => {
  try {
    const { customerName, phone, address, orderNotes, paymentMethod, shippingMethod, shippingCost, items, subtotal, discount, total } = req.body;
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    const order = new Order({
      orderId,
      user: req.user._id,
      customerName,
      phone,
      address,
      orderNotes,
      paymentMethod,
      shippingMethod,
      shippingCost,
      items,
      subtotal,
      discount,
      total,
      status: 'Processing'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/orders/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/stats', adminAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    res.json({ totalProducts, totalOrders, totalUsers, recentOrders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/reviews', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId', 'name').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/reviews/:id', adminAuth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/coupons', adminAuth, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/coupons', adminAuth, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/coupons/:id', adminAuth, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/coupons/:id', adminAuth, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ active: true }).sort('order');
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/banners', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const bannerData = req.body;
    if (req.file) bannerData.image = req.file.path;
    const banner = new Banner(bannerData);
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/banners/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const bannerData = req.body;
    if (req.file) bannerData.image = req.file.path;
    const banner = await Banner.findByIdAndUpdate(req.params.id, bannerData, { new: true });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/banners/:id', adminAuth, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    const obj = {};
    settings.forEach(s => obj[s.key] = s.value);
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/settings', adminAuth, async (req, res) => {
  try {
    const updates = req.body;
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: { filter: { key }, update: { $set: { key, value } }, upsert: true }
    }));
    await SiteSetting.bulkWrite(ops);
    res.json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));