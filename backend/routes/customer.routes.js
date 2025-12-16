import express from 'express';
import * as productCtrl from '../controllers/customer/product.controller.js';
import * as orderCtrl from '../controllers/customer/order.controller.js';
import { protect } from '../middleware/auth.js';
import { isCustomer } from '../middleware/roles.js';

const router = express.Router();

// Products: public
router.get('/products', productCtrl.listProductsPublic);
router.get('/products/:id', productCtrl.getProductPublic);

// Orders: protected for customers
router.post('/orders', protect, isCustomer, orderCtrl.placeOrder);
router.get('/orders', protect, isCustomer, orderCtrl.getMyOrders);
router.get('/orders/:id', protect, orderCtrl.getOrderById); // owner or admin

export default router;
