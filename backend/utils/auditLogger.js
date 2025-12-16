import AuditLog from '../models/audit.model.js';

export const logAction = async ({ req, action, resource, resourceId, before = null, after = null }) => {
  try {
    const actor = req?.user ? { id: req.user._id, name: req.user.name, email: req.user.email } : null;
    const ip = req?.ip || (req?.headers?.['x-forwarded-for'] || '').split(',')[0] || '';
    const userAgent = req?.headers?.['user-agent'] || '';

    // sanitize sensitive data
    if (before && before.password) delete before.password;
    if (after && after.password) delete after.password;

    await AuditLog.create({ actor, action, resource, resourceId, before, after, ip, userAgent });
  } catch (err) {
    console.error('Audit log failed', err);
  }
};
