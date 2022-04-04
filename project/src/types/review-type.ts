type User = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
}

export type ReviewType = {
  comment: string
  date: string
  id: number
  rating: number
  user: User
};

export type ReviewWithIdType = {
  comment: string;
  rating: number;
  id: number;
}

export type ReviewDataType = {
  comment: string;
  rating: number;
}
