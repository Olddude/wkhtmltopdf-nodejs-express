export interface Post {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
