export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin resource. Access denied.' });
  next();
};

export const isCustomer = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'customer') return res.status(403).json({ message: 'Customer resource. Access denied.' });
  next();
};
