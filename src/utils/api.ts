import type { userType, orderType } from '../types';

const baseUrl = process.env.REACT_APP_API_HOST;

export const getUsers = async (): Promise<userType[]> => {
  const res = await fetch(`${baseUrl}/users`);
  const data = await res.json();
  return data;
};

export const getOrders = async (): Promise<orderType[]> => {
  const res = await fetch(`${baseUrl}/orders`);
  const data = await res.json();
  return data;
};

export const checkOrder = async ({
  userName,
  docName,
}: orderType): Promise<orderType[]> => {
  const res = await fetch(
    `${baseUrl}/orders?userName=${userName}&docName=${docName}`
  );
  const data = await res.json();
  return data;
};

export const checkUser = async ({
  login,
  password,
}: userType): Promise<userType[]> => {
  const res = await fetch(
    `${baseUrl}/users?login=${login}&password=${password}`
  );
  const data = await res.json();
  return data;
};

export const createOrder = async (data: orderType) => {
  const res = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.ok;
};
