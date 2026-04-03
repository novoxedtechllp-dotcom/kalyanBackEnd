# Kalyan Stock Management API - Postman Collection

This Postman collection contains all the endpoints for the Kalyan Stock Management System API.

## 🚀 Quick Setup

### 1. Import the Collection
1. Open Postman
2. Click "Import" in the top left
3. Select the `Kalyan_Stock_API_Postman_Collection.json` file
4. The collection will be imported with all endpoints organized by category

### 2. Configure Environment Variables
The collection uses the following variables that you can customize:

- **baseUrl**: Default is `http://localhost:3000` (change to your server URL)
- **authToken**: Automatically set after successful login
- **categoryId**: Set after creating a category (for testing related endpoints)
- **franchiseId**: Set after creating a franchise (for testing related endpoints)
- **productId**: Set after creating a product (for testing related endpoints)
- **subProductId**: Set after creating a sub product (for testing related endpoints)

### 3. Authentication Flow
1. **First**: Use the "Login" endpoint in the Authentication folder
2. The login response automatically sets the `authToken` variable
3. All protected endpoints will automatically use this token

## 📋 API Endpoints Overview

### 🔐 Authentication
- **POST** `/auth/login` - User login (returns JWT token)

### 📂 Categories
- **GET** `/category/all` - Get all categories
- **POST** `/category/add` - Add new category (requires auth)
- **PUT** `/category/update/:id` - Update category (requires auth)
- **DELETE** `/category/delete/:id` - Delete category (requires auth)

### 🏪 Franchises
- **GET** `/franchise/all` - Get all franchises
- **GET** `/franchise/single/:id` - Get single franchise details
- **POST** `/franchise/add` - Add new franchise (requires auth)
- **PUT** `/franchise/update/:id` - Update franchise (requires auth)
- **DELETE** `/franchise/delete/:id` - Delete franchise (requires auth)

### 📦 Products
- **GET** `/product/all` - Get all products
- **GET** `/product/all_franchise` - Get all products by franchise
- **GET** `/product/single/:id` - Get single product details
- **POST** `/product/create` - Create new product (requires auth)
- **PUT** `/product/update/:id` - Update product (requires auth)
- **DELETE** `/product/delete/:id` - Delete product (requires auth)

### 📋 Sub Products
- **GET** `/subproduct/all` - Get all sub products
- **GET** `/subproduct/all_franchise` - Get all sub products by franchise
- **GET** `/subproduct/single/:id` - Get single sub product details
- **POST** `/subproduct/create` - Create new sub product (requires auth)
- **PUT** `/subproduct/update/:id` - Update sub product (requires auth)
- **DELETE** `/subproduct/delete/:id` - Delete sub product (requires auth)
- **GET** `/api/low-stock-count` - Get count of low stock items
- **GET** `/api/low-stock-products` - Get paginated low stock products with filters

### 📊 Stock Management
- **GET** `/stock/all` - Get all stock reports
- **POST** `/stock/add` - Add stock (stock in) (requires auth)
- **POST** `/stock/out` - Remove stock (stock out) (requires auth)

### 📈 Dashboard
- **GET** `/api/dashboard` - Get dashboard analytics data

### 🏥 System
- **GET** `/` - Health check endpoint

## 🔧 Sample Request Bodies

### Login
```json
{
    "email": "admin@example.com",
    "password": "admin123"
}
```

### Add Category
```json
{
    "categoryName": "Electronics"
}
```

### Add Franchise
```json
{
    "franchiseName": "Main Branch"
}
```

### Create Product
```json
{
    "productName": "Laptop",
    "productCode": "LP001",
    "category": "{{categoryId}}",
    "description": "High-performance laptop",
    "price": 999.99
}
```

### Create Sub Product
```json
{
    "name": "Laptop Model X",
    "productCode": "LPX001",
    "productName": "{{productId}}",
    "franchise": "{{franchiseId}}",
    "quantity": 50,
    "minimumQuantity": 10,
    "price": 999.99,
    "categoryName": "Electronics"
}
```

### Stock In
```json
{
    "productId": "{{productId}}",
    "franchiseId": "{{franchiseId}}",
    "quantity": 100,
    "type": "in",
    "notes": "New stock addition"
}
```

### Stock Out
```json
{
    "productId": "{{productId}}",
    "franchiseId": "{{franchiseId}}",
    "quantity": 25,
    "type": "out",
    "notes": "Customer purchase"
}
```

## 🎯 Testing Workflow

1. **Health Check**: Test the system endpoint to ensure server is running
2. **Login**: Authenticate and get the JWT token
3. **Create Base Data**: 
   - Add categories
   - Add franchises
4. **Create Products**: Add main products
5. **Create Sub Products**: Add inventory items with quantities
6. **Stock Operations**: Test stock in/out operations
7. **Dashboard**: Check analytics and reports
8. **Low Stock Alerts**: Test low stock endpoints

## 📝 Notes

- All endpoints that modify data (POST, PUT, DELETE) require authentication
- The `authToken` is automatically managed by the collection after login
- Update the `baseUrl` variable if your server runs on a different port or domain
- Some endpoints use variables from previous requests (e.g., `{{categoryId}}`)
- The collection includes test scripts to automatically extract and set IDs from responses

## 🔍 Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🛠️ Customization

You can modify the collection to:
- Add different test scenarios
- Change request body examples
- Add additional test scripts
- Modify environment variables
- Add authentication for different user roles

## 📞 Support

For any issues with the API or collection, refer to the API documentation or contact the development team.
