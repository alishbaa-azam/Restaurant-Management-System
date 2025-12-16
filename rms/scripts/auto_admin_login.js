// Usage: node scripts/auto_admin_login.js
// This script logs in via the backend, sets localStorage in a headless browser, navigates to /admin/dashboard and saves a screenshot.
import puppeteer from 'puppeteer';

const BACKEND = process.env.BACKEND || 'http://localhost:5000';
const FRONTEND = process.env.FRONTEND || 'http://localhost:5174';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASS = process.env.ADMIN_PASS || 'demo1234';

console.log('auto_admin_login starting...');

async function loginGetToken() {
  const res = await fetch(`${BACKEND}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return await res.json();
}

(async () => {
  try {
    console.log('Requesting token from backend...');
    const { token, user } = await loginGetToken();
    console.log('Launching headless browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set localStorage before navigation to app routes
    await page.goto(FRONTEND, { waitUntil: 'networkidle' });
    await page.evaluate((t, u) => {
      localStorage.setItem('token', t);
      localStorage.setItem('user', JSON.stringify(u));
    }, token, user);

    await page.goto(`${FRONTEND}/admin/dashboard`, { waitUntil: 'networkidle' });

    // Wait for Dashboard header to show
    await page.waitForSelector('h1', { timeout: 5000 });
    const headerText = await page.$eval('h1', el => el.textContent || '');
    console.log('Header found:', headerText.trim().slice(0, 80));

    const out = 'scripts/admin_dashboard.png';
    await page.screenshot({ path: out, fullPage: true });
    console.log('Screenshot saved to', out);

    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
