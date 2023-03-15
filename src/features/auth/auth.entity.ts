export interface AuthEntity {
  readonly id: string;
  readonly username: string;
  readonly passwordHash: string;
  readonly roles: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
