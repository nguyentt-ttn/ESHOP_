export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type LoginRes = {
  accessToken: string;
  user: User;
};
