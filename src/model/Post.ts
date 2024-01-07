import { User } from '@/model/User';
import { PostImage } from '@/model/PostImage';

interface UserId {
  userId: string;
}

export interface Post {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  Hearts: UserId[];
  Reposts: UserId[];
  Comments: UserId[];
  _count: {
    Hearts: number;
    Comments: number;
    Reposts: number;
  };
}
