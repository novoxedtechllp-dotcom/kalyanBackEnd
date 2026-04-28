import { dltCategory, getAll, saveCategory, updCategory } from "../services/category.service.js";


// add new category
export async function addCategory(req, res, next) {
  try {
    const categoryData = req.body;
    const result = await saveCategory(categoryData);
    res.status(200).send({ message: "Category added successfully" , result});
  } catch (err) {
    next(err);
  }
}

// get all category
export async function getAllCategory(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await getAll(page, limit, search);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

// update a category
export async function updateCategory(req, res, next) {
  try {
     const categoryData = req.body;
     const categoryId = req.params.id;
    const result = await updCategory(categoryData,categoryId);
    res.status(200).send({result,  message: "Category updated successfully" });
  } catch (err) {
    next(err);
  }
}

// delete a category
export async function deleteCategory(req, res, next) {
  try {
     const categoryId = req.params.id;
    const result = await dltCategory(categoryId);
    res.status(200).send({result, message:"Delete category successfully"});
  } catch (err) {
    next(err);
  }
}

