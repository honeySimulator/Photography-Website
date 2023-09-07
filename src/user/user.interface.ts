export interface UserData {
  username: string;
  token: string;
  user_id: number;
}

export interface UserRO {
  user: UserData;
}