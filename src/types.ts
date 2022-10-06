export type userType = {
  id?: number;
  name?: string;
  login?: string;
  password?: string;
};

export type orderType = { id?: number; userName: string; docName: string };

export type rowType = { docName: string; ordersCount: number };
