import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user, token, login, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [sidebarCollapsedDefault, setSidebarCollapsedDefault] = useState(false);
  const [theme, setTheme] = useState('brown');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load persisted settings
    const collapsed = JSON.parse(localStorage.getItem('adminSidebarCollapsed') || 'false');
    setSidebarCollapsedDefault(collapsed);
    const t = localStorage.getItem('adminTheme') || 'brown';
    setTheme(t);
  }, []);

  const handleSave = () => {
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(sidebarCollapsedDefault));
    localStorage.setItem('adminTheme', theme);

    // Update display name locally (AuthContext + localStorage)
    if (user) {
      const updatedUser = { ...user, name: displayName };
      login(updatedUser, token);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    setDisplayName(user?.name || '');
    setSidebarCollapsedDefault(false);
    setTheme('brown');
    localStorage.removeItem('adminTheme');
    localStorage.setItem('adminSidebarCollapsed', 'false');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your admin preferences for the dashboard.</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ead7cd]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                className="w-full p-3 border border-[#ead7cd] rounded-lg focus:ring-2 focus:ring-[#5a2812]/40 focus:border-[#5a2812]"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
              <p className="text-xs text-gray-500 mt-2">This name appears in the sidebar profile chip.</p>
            </div>

            {/* UI Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ead7cd]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sidebar</h2>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={sidebarCollapsedDefault}
                    onChange={(e) => setSidebarCollapsedDefault(e.target.checked)}
                  />
                  <span className="text-gray-700">Start collapsed by default</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">Persists across sessions.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#ead7cd]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="adminTheme"
                      value="brown"
                      checked={theme === 'brown'}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                    <span className="text-gray-700">Dark-Brown (Foodies)</span>
                  </label>
                  <label className="flex items-center gap-3 opacity-70">
                    <input
                      type="radio"
                      name="adminTheme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                    <span className="text-gray-700">Light (preview)</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">Theme preference is stored locally.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSave}
                className="bg-[#5a2812] hover:bg-[#6b3a25] text-white px-5 py-2 rounded-lg shadow"
              >
                Save Changes
              </button>
              <button
                onClick={handleReset}
                className="bg-[#f8f3f0] hover:bg-[#efe4dc] text-[#5a2812] px-5 py-2 rounded-lg border border-[#ead7cd]"
              >
                Reset
              </button>
              <button
                onClick={logout}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-lg border border-red-200"
              >
                Logout
              </button>
              {saved && <span className="text-green-600 text-sm">Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
