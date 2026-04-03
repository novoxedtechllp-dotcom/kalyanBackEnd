// import categoryModel from "../models/categoryModel.js";
// import franchiseModel from "../models/franchiseModel.js";
// import productModel from "../models/productModel.js";


// // get all categories
// export async function getDashbordDatas() {
//   const totalCategories= await categoryModel.find().countDocuments();
//   const totalfranchise= await franchiseModel.find().countDocuments();
//   const totalProducts = await productModel.find().countDocuments()
//   return { totalCategories, totalfranchise, totalProducts };
// }



import categoryModel from "../models/categoryModel.js";
import franchiseModel from "../models/franchiseModel.js";
import productModel from "../models/productModel.js";
import subProductModel from "../models/subProduct.js"; // Assuming you have a subProductModel


// get all categories
export async function getDashbordDatas() {
  const totalCategories= await categoryModel.find().countDocuments();
  const totalfranchise= await franchiseModel.find().countDocuments();
  const totalProducts = await productModel.find().countDocuments();
  
  // Get low stock count
  const lowStockCount = await subProductModel.countDocuments({
    $expr: { $lte: ["$quantity", "$minimumQuantity"] }
  });

  return { totalCategories, totalfranchise, totalProducts, lowStockCount };
}

export async function getLowStockProducts() {
  const products = await subProductModel.find({
    $expr: { $lte: ["$quantity", "$minimumQuantity"] }
  }).populate('category', 'name') // Assuming there is a category field to populate
    .sort({ quantity: 1 });

  return { 
    totalProducts: products.length,
    products 
  };
}

