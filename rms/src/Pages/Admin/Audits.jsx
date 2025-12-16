import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

export default function Audits() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [resource, setResource] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAudits({ page, limit, resource: resource || undefined, action: action || undefined });
      setLogs(res.data.logs || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch audits', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [page, limit]);

  const applyFilters = () => {
    setPage(1);
    fetchLogs();
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Audit Logs</h2>
          <p className="text-sm text-gray-500">Track admin create/update/delete actions</p>
        </div>
        <div className="flex items-center gap-2">
          <input value={resource} onChange={(e) => setResource(e.target.value)} placeholder="resource (product,user,order)" className="border rounded px-3 py-2" />
          <select value={action} onChange={(e) => setAction(e.target.value)} className="border rounded px-3 py-2">
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
          <button onClick={applyFilters} className="bg-[#5a2812] text-white px-4 py-2 rounded flex items-center gap-2"><FaSearch /> Filter</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border rounded">
        <table className="w-full text-left">
          <thead className="bg-[#faf6f3]">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">Resource ID</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center">Loading…</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center">No audit logs found</td></tr>
            ) : logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="px-4 py-3">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">{log.actor?.name || 'System'}<div className="text-xs text-gray-400">{log.actor?.email}</div></td>
                <td className="px-4 py-3 capitalize">{log.action}</td>
                <td className="px-4 py-3">{log.resource}</td>
                <td className="px-4 py-3 break-all">{String(log.resourceId)}</td>
                <td className="px-4 py-3">
                  <details className="text-sm text-gray-700">
                    <summary className="cursor-pointer">View</summary>
                    <div className="mt-2">
                      {log.before && <div><strong>Before:</strong><pre className="text-xs max-h-40 overflow-auto">{JSON.stringify(log.before, null, 2)}</pre></div>}
                      {log.after && <div className="mt-2"><strong>After:</strong><pre className="text-xs max-h-40 overflow-auto">{JSON.stringify(log.after, null, 2)}</pre></div>}
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Showing page {page} — total {total} logs</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="p-2 rounded border"><FaChevronLeft /></button>
          <input type="number" min={1} value={page} onChange={(e) => setPage(Math.max(1, Number(e.target.value || 1)))} className="w-16 border rounded px-2 py-1 text-center" />
          <button onClick={() => setPage(p => p + 1)} className="p-2 rounded border"><FaChevronRight /></button>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
