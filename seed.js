import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const MONGO = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noirongdb';

const products = [{"name": "Cozy Cushion", "slug": "cozy-cushion", "category": "Home decor", "description": "Soft and stylish cushion that brightens any sofa.", "price": 19.99, "image": "https://thumbs.dreamstime.com/b/stylish-cozy-reading-nook-grey-sofa-cushions-blanket-near-beige-wall-scandinavian-interior-design-modern-living-room-282626679.jpg", "stock": 50}, {"name": "Aroma Candle Set", "slug": "aroma-candle-set", "category": "Home decor", "description": "Calming scented candles for cozy evenings.", "price": 24.99, "image": "https://m.media-amazon.com/images/I/81xelnd4HbL.jpg", "stock": 50}, {"name": "Modern Wall Clock", "slug": "modern-wall-clock", "category": "Home decor", "description": "Minimal wall clock with silent sweep.", "price": 34.99, "image": "https://artiemestieri.it/cdn/shop/articles/role-of-modern-wall-clock.jpg?v=1719210999", "stock": 50}, {"name": "Nordic Table Lamp", "slug": "nordic-table-lamp", "category": "Home decor", "description": "Warm LED lamp with linen shade.", "price": 49.99, "image": "https://ae01.alicdn.com/kf/S73a291ba0caf41c5bdc6c4c3a541169dn.jpg", "stock": 50}, {"name": "Crystal Swan", "slug": "crystal-swan", "category": "Showpiece", "description": "Elegant crystal swan centerpiece.", "price": 39.99, "image": "https://image.made-in-china.com/202f0j00oNZtbTjBkckS/High-Grade-Crystal-Swan-Gift-Crystal-Wedding-Decorations.webp", "stock": 50}, {"name": "Bronze Horse", "slug": "bronze-horse", "category": "Showpiece", "description": "Detailed bronze horse figurine.", "price": 59.99, "image": "https://americanbronzes.com/wp-content/uploads/2019/06/STALLION_18.jpg", "stock": 50}, {"name": "Mini Eiffel Tower", "slug": "mini-eiffel-tower", "category": "Showpiece", "description": "Paris vibe with a mini Eiffel showpiece.", "price": 14.99, "image": "https://www.maison-midi.com/cdn/shop/files/11_6_23_1.jpg?v=1705428527&width=990", "stock": 50}, {"name": "Marble Buddha", "slug": "marble-buddha", "category": "Showpiece", "description": "Serene marble Buddha statue.", "price": 44.99, "image": "https://yellowverandah.in/cdn/shop/files/17_2.jpg?v=1746734675", "stock": 50}, {"name": "Oak Coffee Table", "slug": "oak-coffee-table", "category": "Furniture", "description": "Sturdy oak table with rounded edges.", "price": 129.99, "image": "https://www.daals.co.uk/cdn/shop/files/BSD-141-OAK_scene1.jpg?v=1706551318", "stock": 50}, {"name": "Velvet Accent Chair", "slug": "velvet-accent-chair", "category": "Furniture", "description": "Comfy chair with premium velvet.", "price": 179.99, "image": "https://www.danetti.com/cdn/shop/files/Callan_Dark_Mocha_Chair_Lifestyle_Front_No_Cush.jpg?v=1737718101", "stock": 50}, {"name": "Urban Bookshelf", "slug": "urban-bookshelf", "category": "Furniture", "description": "5-tier bookshelf for modern homes.", "price": 139.99, "image": "https://img.drz.lazcdn.com/static/bd/p/7a305f468e69c8c30cd05728befc54d5.jpg_720x720q80.jpg", "stock": 50}, {"name": "Bedside Cabinet", "slug": "bedside-cabinet", "category": "Furniture", "description": "Two-drawer compact nightstand.", "price": 89.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfO70cpc5FGHlbNZC7QjQ_1ekrhuPoHp8cMg&s", "stock": 50}, {"name": "Sunset Canvas", "slug": "sunset-canvas", "category": "Paints", "description": "Hand-painted sunset on canvas.", "price": 69.99, "image": "https://uk.bimago.media/media/catalog/image/view/product/149844/role/small_image/size/750x1120/type/dk-osmr-ng2/0ea830d8251bf97348e6d63e0e6ec749.webp", "stock": 50}, {"name": "Abstract Splash", "slug": "abstract-splash", "category": "Paints", "description": "Bold abstract splash artwork.", "price": 79.99, "image": "https://img.pixers.pics/pho_wat(s3:700/FO/44/36/03/63/700_FO44360363_8ea5cb6eff5c02d4b46e2faee4c53a08.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/stickers-abstract-splash-painting.jpg.jpg", "stock": 50}, {"name": "Floral Watercolor", "slug": "floral-watercolor", "category": "Paints", "description": "Delicate floral watercolor piece.", "price": 59.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0yGbz-uRBVKlhlAfixmUCXyL5H_23waKb6g&s", "stock": 50}, {"name": "Mountain Landscape", "slug": "mountain-landscape", "category": "Paints", "description": "Peaceful mountain scenery painting.", "price": 89.99, "image": "https://images.stockcake.com/public/5/3/4/5344a6e2-9139-4a72-882b-d937ea575a49_large/mountain-lake-view-stockcake.jpg", "stock": 50}];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
  await mongoose.connect(MONGO);
  console.log('Connected');
  await Product.deleteMany({});
  await User.deleteMany({});

  await Product.insertMany(products);
  console.log('Inserted products:', products.length);

  const password = await bcrypt.hash('password123', 10);
  const user = await User.create({ name: 'Demo User', email: 'demo@noirong.test', password, cart: [] });
  console.log('Created demo user:', user.email);

  await mongoose.disconnect();
  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });
