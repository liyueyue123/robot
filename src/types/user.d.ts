export type UserEntity = {
  id: number;
  username: string;
  avatar: string;
  balance: number;
}

export type UserUpdateParams = {
  balance?: number;
  avatar?: string;
}

