const products = [
  {
    "id": 1,
    "title": "Burfi Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 26000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751699378/brfi-bed_cggoxn.jpg",
    "description": "A luxurious bed with a burfi-inspired panel design, providing both comfort and style for a cozy and elegant bedroom setup.",
    "stock": true
  },
  {
    "id": 2,
    "title": "Burfi Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 28000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751699378/brfi-bed_cggoxn.jpg",
    "description": "Spacious and stylish, this Burfi Design Bed adds elegance to your bedroom with its unique panel pattern and premium finish.",
    "stock": true
  },
  {
    "id": 3,
    "title": "Big Diamond Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751699956/diamond-bed-2_z1kiym.webp",
    "description": "Make a bold statement with this Big Diamond Design Bed, featuring an eye-catching geometric headboard ideal for modern interiors.",
    "stock": true
  },
  {
    "id": 4,
    "title": "Big Diamond Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751699956/diamond-bed-2_z1kiym.webp",
    "description": "Upgrade your comfort with this oversized Big Diamond Design Bed, crafted to blend luxury with contemporary appeal.",
    "stock": true
  },
  {
    "id": 5,
    "title": "Diamond Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700097/diamond-bed_rvtrjq.webp",
    "description": "A beautiful Diamond Design Bed with symmetrical headboard pattern, perfect for enhancing the aesthetics of any bedroom.",
    "stock": true
  },
  {
    "id": 6,
    "title": "Diamond Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700097/diamond-bed_rvtrjq.webp",
    "description": "Add extra comfort and space with this extended Diamond Design Bed featuring premium woodwork and stylish finish.",
    "stock": true
  },
  {
    "id": 7,
    "title": "Diamond Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700310/diamond-bed-2_yxjln2.jpg",
    "description": "Crafted with precision, this Diamond Design Bed delivers elegance and support with a modern flair.",
    "stock": true
  },
  {
    "id": 8,
    "title": "Diamond Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700310/diamond-bed-2_yxjln2.jpg",
    "description": "The extended size Diamond Design Bed brings luxury and practicality together for large bedrooms.",
    "stock": true
  },
  {
    "id": 9,
    "title": "Big Panal Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700285/big-panal-bed_kqtgon.webp",
    "description": "Bold and elegant, this Big Panel Design Bed is crafted for those who value sturdy construction and artistic paneling.",
    "stock": true
  },
  {
    "id": 10,
    "title": "Big Panal Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 26000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751700285/big-panal-bed_kqtgon.webp",
    "description": "Spacious and stylish, the Big Panel Design Bed offers comfort with a touch of traditional charm.",
    "stock": true
  },
  {
    "id": 11,
    "title": "Panel Block Design Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706037/chokdi-bed_iqdafx.webp",
    "description": "A uniquely patterned panel block bed, ideal for adding symmetry and style to your personal space.",
    "stock": true
  },
  {
    "id": 12,
    "title": "Panel Block Design Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706037/chokdi-bed_iqdafx.webp",
    "description": "Spacious and decorative, this Panel Block Design Bed blends traditional style with modern comfort.",
    "stock": true
  },
  {
    "id": 13,
    "title": "Woven Strap Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706274/niwar-bed_mc1m67.jpg",
    "description": "Inspired by traditional craftsmanship, this Woven Strap Bed offers breathable comfort and rustic charm.",
    "stock": true
  },
  {
    "id": 14,
    "title": "Woven Strap Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706274/niwar-bed_mc1m67.jpg",
    "description": "Extra roomy and handcrafted, this Woven Strap Bed delivers traditional style with a modern touch.",
    "stock": true
  },
  {
    "id": 15,
    "title": "Cushioned Headboard Bed",
    "size": "6 x 6 feet",
    "category": "Bed",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706423/gddi-bed_ci3pnv.webp",
    "description": "Designed for relaxation, this bed features a soft cushioned headboard ideal for reading or watching TV in comfort.",
    "stock": true
  },
  {
    "id": 16,
    "title": "Cushioned Headboard Bed",
    "size": "6 x 6.5 feet",
    "category": "Bed",
    "price": 27000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706423/gddi-bed_ci3pnv.webp",
    "description": "Modern elegance meets comfort in this Cushioned Headboard Bed, offering extra space and plush support.",
    "stock": true
  },
  {
    "id": 17,
    "title": "Chowki",
    "size": "2 x 2 feet",
    "category": "Chowki",
    "price": 1599,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751706691/chowki-4paga_sc7kf5.png",
    "description": "Compact and durable wooden chowki, perfect for traditional ceremonies, seating, or everyday utility.",
    "stock": true
  },
  {
    "id": 18,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707044/sofa-9_uf3eao.webp",
    "description": "A modern 3-piece wooden sofa set with comfortable cushioning and timeless elegance for your living room.",
    "stock": true
  },
  {
    "id": 19,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707053/sofa-7_bcw8mt.webp",
    "description": "Elegant wooden sofa set designed for luxurious comfort and a classic living room aesthetic.",
    "stock": true
  },
  {
    "id": 20,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707065/sofa-5_flwxps.jpg",
    "description": "Beautifully handcrafted sofa set made from high-quality wood, ideal for comfort and charm.",
    "stock": true
  },
  {
    "id": 21,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707083/sofa-4_dupnkw.jpg",
    "description": "Premium wooden sofa set crafted for durability and style, ideal for modern Indian living rooms.",
    "stock": true
  },
  {
    "id": 22,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707093/spfa-3_gc6zir.jpg",
    "description": "Stylish and sturdy, this wooden sofa set enhances comfort and offers a traditional finish.",
    "stock": true
  },
  {
    "id": 23,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707103/sofa-2_owjjpn.jpg",
    "description": "Chic and reliable, this 3-piece wooden sofa adds charm and coziness to your living space.",
    "stock": true
  },
  {
    "id": 24,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707121/sofa_s56cu9.jpg",
    "description": "A timeless wooden sofa set, designed for both aesthetics and comfort in any home.",
    "stock": true
  },
  {
    "id": 25,
    "title": "Wooden Sofa",
    "size": "3-Piece Sofa Set",
    "category": "Sofa",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707164/sofa-2_kiurb0.webp",
    "description": "Elegant and spacious, this wooden sofa set is perfect for family lounging and guests.",
    "stock": true
  },
  {
    "id": 26,
    "title": "Solid Wood Double Door Almira",
    "size": "2 Door Almira",
    "category": "Almira",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707438/almari_y11oze.jpg",
    "description": "A spacious and elegant 2-door wooden almira, perfect for organizing your clothes and essentials.",
    "stock": true
  },
  {
    "id": 27,
    "title": "Solid Wood Double Door Almira",
    "size": "2 Door Almira",
    "category": "Almira",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707512/almari-diamond_fbfy55.webp",
    "description": "Beautifully designed wooden almira with diamond carving, combining utility with aesthetics.",
    "stock": true
  },
  {
    "id": 28,
    "title": "Triple Door Wooden Almira",
    "size": "3 Door Almira",
    "category": "Almira",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707593/almari-2_q8wzqu.webp",
    "description": "Spacious triple door almira made with premium wood, ideal for large storage needs.",
    "stock": true
  },
  {
    "id": 29,
    "title": "Wooden Chair",
    "size": "1 Piece Chair",
    "category": "Chair",
    "price": 1800,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707628/chair_vafwxx.jpg",
    "description": "A sturdy and elegant wooden chair suitable for home, study, or office use.",
    "stock": true
  },
  {
    "id": 30,
    "title": "Book Shelf",
    "size": "24 x 18 x 6 inches",
    "category": "Shelf",
    "price": 3000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751707908/book-shelf_gl7uje.avif",
    "description": "Compact wooden bookshelf with multiple levels to keep your books organized and accessible.",
    "stock": true
  },
  {
    "id": 31,
    "title": "Washbasin Box",
    "size": "20 x 21 x 6 inches",
    "category": "Shelf",
    "price": 5000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708140/washbasin-box_ftpkyk.jpg",
    "description": "Stylish wooden washbasin box to add functionality and decor to your bathroom space.",
    "stock": true
  },
  {
    "id": 32,
    "title": "Tea Table",
    "size": "4 x 2 feet",
    "category": "Table",
    "price": 6000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708363/Tea-table_arlbrd.webp",
    "description": "A sleek and elegant wooden tea table, perfect for serving refreshments and enhancing your living room décor.",
    "stock": true
  },
  {
    "id": 33,
    "title": "Tea Table",
    "size": "3.5 x 2 feet",
    "category": "Table",
    "price": 6000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708363/Tea-table_arlbrd.webp",
    "description": "A sleek and elegant wooden tea table, perfect for serving refreshments and enhancing your living room décor.",
    "stock": true
  }, 
  {
    "id": 34,
    "title": "Tea Table",
    "size": "3.5 x 2 feet",
    "category": "Table",
    "price": 6000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708363/Tea-table_arlbrd.webp",
    "description": "A sleek and elegant wooden tea table, perfect for serving refreshments and enhancing your living room décor.",
    "stock": true
  },
 {
    "id": 35,
    "title": "Dining Table",
    "size": "4 x 4 feet , with 4 chairs",
    "category": "Table",
    "price": 20000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708735/dining-table_wixqic.jpg",
    "description": "A stylish and sturdy wooden dining table set, perfect for family meals and gatherings. Crafted with solid wood and elegant finish to elevate your dining space.",
    "stock": true
  },
  {
    "id": 36,
    "title": "Dining Table",
    "size": "4 x 6 feet , with 6 chairs",
    "category": "Table",
    "price": 25000,
    "image": "https://res.cloudinary.com/dadclqksp/image/upload/v1751708717/dining-table-2_mfdwpp.webp",
    "description": "A stylish and sturdy wooden dining table set, perfect for family meals and gatherings. Crafted with solid wood and elegant finish to elevate your dining space.",
    "stock": true
  }

]

export default products;