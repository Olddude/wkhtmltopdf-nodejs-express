export interface User {
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
