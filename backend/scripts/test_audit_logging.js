const API = 'http://localhost:5000/api';

const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

const run = async () => {
  // Login as admin
  const l = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'admin@example.com', password: 'demo1234' }) });
  const login = await l.json();
  const token = login.token;
  console.log('logged in as', login.user.email);

  // Create product
  const p = await fetch(`${API}/admin/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: 'AuditTest', description: 'test', price: 1, category: 'test' }) });
  assert(p.status === 201, 'product create failed');
  const prod = await p.json();
  console.log('created product', prod._id);

  // Update product
  const u = await fetch(`${API}/admin/products/${prod._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ price: 2 }) });
  assert(u.status === 200, 'product update failed');
  console.log('updated product');

  // Delete product
  const d = await fetch(`${API}/admin/products/${prod._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  assert(d.status === 200, 'product delete failed');
  console.log('deleted product');

  // Fetch audits for product
  const a = await fetch(`${API}/admin/audits?resource=product`, { headers: { Authorization: `Bearer ${token}` } });
  const audits = await a.json();
  console.log('audits found:', audits.total);
  assert(audits.total >= 3, 'expected at least 3 audit logs for product');

  console.log('Audit logging test passed');
};

run().catch(err => { console.error('Test failed:', err); process.exit(1); });
