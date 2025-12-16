const API = process.env.API_URL || 'http://localhost:5000/api';

(async () => {
  try {
    // Login as demo admin
    const loginRes = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'demo1234' })
    });
    const login = await loginRes.json();
    if (!login.token) throw new Error('Login failed');
    const token = login.token;

    // Create product
    const payload = { name: 'FlowTestProduct', description: 'flow test', price: 4.5, category: 'SPECIALS', special: true };
    const createRes = await fetch(`${API}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    console.log('create status', createRes.status);
    const created = await createRes.json();
    console.log('created id', created._id);

    // Fetch public menu
    const menuRes = await fetch(`${API}/menu`);
    const menu = await menuRes.json();
    const found = menu.find(i => i.name === 'FlowTestProduct');
    if (found) console.log('SUCCESS: product visible in public menu');
    else console.error('FAIL: product not found in public menu');
    
      // Now update availability to false and ensure still visible
      const updRes = await fetch(`${API}/admin/products/${created._id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isAvailable: false })
      });
      console.log('update status', updRes.status);
      const menu2 = await (await fetch(`${API}/menu`)).json();
      const found2 = menu2.find(i => i.name === 'FlowTestProduct');
      if (found2) console.log('SUCCESS: product still visible after being set unavailable');
      else console.error('FAIL: product missing after update');

  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();