Run 

npm run start:dev



REGISET

http://localhost:3005/auth/signup


Login:http://localhost:3005/auth/login



user account get:http://localhost:3005/auth/accounts

user account delete:http://localhost:3005/auth/accounts/671f3801b4725e9125ac321a


user password update:   http://localhost:3005/auth/change-password/:id

PRODUCT:

http://localhost:3005/products  :POST METHOD

{
  "productName": "Sample Product",
  "companyName": "Sample Company",
  "basePrice": 100.00,
  "discountPrice": 80.00,
  "discountOffer": "20% off",
  "totalStockCount": 50,
  "productImage": "http://example.com/image.jpg",
  "categories": ["Adventure", "Classics"]
}


Get All Products:

http://localhost:3005/products

Get a Single Product by ID:

http://localhost:3005/products/:ID



UPADATE PRODUCT:


PUT METHOD
http://localhost:3005/products/:ID



 Delete a Product
 
DELETE  METHOD
http://localhost:3005/products/:ID






Orders:


monthy-income url:http://localhost:3005/orders/analytics/monthly-income   Get Method Using


today-orders url:http://localhost:3005/orders/analytics/today-orders   Get method  using  

url:loclahost:3005/orders   post method  using
 
 today order url:  http://localhost:3005/orders/analytics/today-orders

 year la complete in then product count:http://localhost:3005/orders/analytics/monthly-completed-orders       get method using

json data
{
  "cartitem": [
    {
      "name": "Firecracker",
      "price": 5,
      "quantity": 10
    },
    {
      "name": "Sparkler",
      "price": 2,
      "quantity": 5
    }
  ],
  "status": "pending",
  "amount": 70,
  "date": "2024-11-13T18:00:00Z",
  "phoneNumber": "+1234567890",
  "address": "123 Fireworks Lane, Spark City"
}


get url:loclahost:3005/orders

get :id url: /orders/:id


put method using:/orders/:id/status

{
  "status": "completed"
}



delete method using is :/orders/:id