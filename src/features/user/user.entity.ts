import mongoose from 'mongoose';
import { v4 } from 'uuid';

interface UserEntity {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly passwordHash: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly avatar: string;
  readonly roles: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

const userSchema = new mongoose.Schema<UserEntity>({
  id: { type: String, default: v4, unique: true, required: true },
  email: { type: String, default: '', unique: true, required: true },
  username: { type: String, default: '', unique: true, required: true },
  passwordHash: { type: String, default: '', required: true },
  firstname: { type: String, default: '', required: true },
  lastname: { type: String, default: '', required: true },
  avatar: { type: String, default: '/avatar.jpeg', required: true },
  roles: { type: [String], default: ['admin'], required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: null, required: false },
  deletedAt: { type: Date, default: null, required: false },
});

const UserRepository = mongoose.model('User', userSchema);

export { UserEntity, UserRepository };
