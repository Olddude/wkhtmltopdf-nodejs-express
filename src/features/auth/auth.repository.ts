import mongoose from 'mongoose';

import { AuthSchema } from './auth.schema';

const AuthRepository = mongoose.model('Auth', AuthSchema);

export { AuthRepository };
