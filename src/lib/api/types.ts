export interface User {
  id: number;
  username: string;
  passwordHash: string;
  createdAt: Date;
  hashedRefreshToken?: string;
}

export interface PostBody {
  posts: Post[];
  totalPost: number;
  currentPage: number;
  limit: number;
}

export interface Tag {
  tag_id: number;
  tag_name: string;
  post_count: string;
}

export interface PostTag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  isPrivate?: boolean;
  user: User;
  tags: PostTag[];
  prevPost?: Post | null;
  nextPost?: Post | null;
}
