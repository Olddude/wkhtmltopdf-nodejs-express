import mongoose from 'mongoose';
import { v4 } from 'uuid';

import { AuthEntity } from './auth.entity';

const AuthSchema = new mongoose.Schema<AuthEntity>({
  id: { type: String, default: v4, unique: true, required: true },
  username: { type: String, default: '', unique: true, required: true },
  passwordHash: { type: String, default: '', required: true },
  roles: { type: [String], default: ['admin'], required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: null, required: false },
  deletedAt: { type: Date, default: null, required: false },
});

export { AuthSchema };
