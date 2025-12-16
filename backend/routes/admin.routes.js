import express from 'express';
import * as userCtrl from '../controllers/admin/user.controller.js';
import * as productCtrl from '../controllers/admin/product.controller.js';
import * as orderCtrl from '../controllers/admin/order.controller.js';
import * as auditCtrl from '../controllers/admin/audit.controller.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roles.js';

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, isAdmin);

// Users
router.get('/users', userCtrl.listUsers);
router.get('/users/:id', userCtrl.getUser);
router.put('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

// Products
router.post('/products', productCtrl.createProduct);
router.get('/products', productCtrl.listProducts);
router.get('/products/:id', productCtrl.getProduct);
router.put('/products/:id', productCtrl.updateProduct);
router.delete('/products/:id', productCtrl.deleteProduct);

// Orders
router.get('/orders', orderCtrl.listOrders);
router.get('/orders/:id', orderCtrl.getOrder);
router.put('/orders/:id', orderCtrl.updateOrderStatus);
router.delete('/orders/:id', orderCtrl.deleteOrder);

// Audits
router.get('/audits', auditCtrl.listAudits);

export default router;
