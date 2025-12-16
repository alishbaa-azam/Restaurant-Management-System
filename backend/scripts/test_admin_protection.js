const API = 'http://localhost:5000/api';

// Uses global fetch available in Node 18+
if (typeof fetch === 'undefined') {
  console.error('Global fetch not available in this Node runtime. Run with Node 18+.');
  process.exit(1);
}

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

const run = async () => {
  console.log('1) Unauthenticated request -> expect 401');
  const r1 = await fetch(`${API}/admin/users`);
  console.log('status', r1.status);
  assert(r1.status === 401, 'Expected 401 for unauthenticated request');

  console.log('2) Login as customer and request -> expect 403');
  const cLogin = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'customer@example.com', password: 'demo1234' }) });
  const cData = await cLogin.json();
  const r2 = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${cData.token}` } });
  console.log('status', r2.status);
  assert(r2.status === 403, 'Expected 403 for customer token');

  console.log('3) Login as admin and request -> expect 200');
  const aLogin = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'admin@example.com', password: 'demo1234' }) });
  const aData = await aLogin.json();
  const r3 = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${aData.token}` } });
  console.log('status', r3.status);
  assert(r3.status === 200, 'Expected 200 for admin token');

  console.log('All checks passed');
};

run().catch(err => { console.error('Test failed:', err.message); process.exit(1); });
