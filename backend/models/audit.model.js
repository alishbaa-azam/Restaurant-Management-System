import mongoose from 'mongoose';

const AuditSchema = new mongoose.Schema({
  actor: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String,
  },
  action: { type: String, enum: ['create', 'update', 'delete'], required: true },
  resource: { type: String, required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  before: { type: mongoose.Schema.Types.Mixed },
  after: { type: mongoose.Schema.Types.Mixed },
  ip: String,
  userAgent: String,
}, { timestamps: true });

export default mongoose.model('AuditLog', AuditSchema);
