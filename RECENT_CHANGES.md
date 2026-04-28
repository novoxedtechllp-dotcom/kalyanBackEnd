# Recent Changes — Backend

**Date:** 2026-04-28  
**Feature:** Server-Side Pagination support for Category API

---

## Overview

The category endpoint was updated to support pagination and search, matching the pattern already used by the product and stock endpoints. No other backend files were modified — the product, sub-product, and stock services already had pagination support.

---

## Files Changed

### 1. `services/category.service.js`

**Function:** `getAll(page, limit, search)`

**Before:** Returned all categories with no filtering or pagination.

**After:**
```js
export async function getAll(page = 1, limit = 10, search = '') {
  const startIndex = (page - 1) * limit;
  let query = {};
  if (search) {
    query.categoryName = { $regex: search, $options: 'i' };
  }
  const [category, total] = await Promise.all([
    categoryModel.find(query).skip(startIndex).limit(limit).sort({ createdAt: -1 }),
    categoryModel.countDocuments(query)
  ]);
  const totalPages = Math.ceil(total / limit);
  return { category, total, totalPages };
}
```

**Key changes:**
- Accepts `page`, `limit`, `search` parameters
- Regex search on `categoryName` field (case-insensitive)
- Uses `Promise.all` for parallel data + count query (efficient)
- Returns `{ category, total, totalPages }`

---

### 2. `controllers/category.controller.js`

**Function:** `getAllCategory(req, res, next)`

**Before:** Called `getAll()` with no arguments.

**After:**
```js
export async function getAllCategory(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const result = await getAll(page, limit, search);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}
```

**Key changes:**
- Reads `?page`, `?limit`, `?search` from `req.query`
- Defaults: page=1, limit=10, search=''
- Passes all parameters to the service layer

---

## API Endpoint Reference

### Categories
```
GET /category/all?page=1&limit=10&search=electrical
```
**Response:**
```json
{
  "category": [...],
  "total": 47,
  "totalPages": 5
}
```

---

## Already Supported (No Changes Needed)

| Endpoint | Pagination Support |
|---|---|
| `GET /product/all` | ✅ `page`, `limit`, `search` |
| `GET /subproduct/all` | ✅ `page`, `limit`, `search` |
| `GET /stock/all` | ✅ `page`, `limit`, `search`, `type`, `franchise` |
| `GET /category/all` | ✅ **Added in this commit** |
