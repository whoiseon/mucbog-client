export interface User {
  id: number;
  username: string;
  passwordHash: string;
  createdAt: Date;
  hashedRefreshToken?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  thumbnail?: string;
  user: User;
  tags: Tag[];
}
