export interface FormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
  file: string | null;
  store: string;
}
export interface Store {
  _id: string;
  name: string;
  location: string;
  owner: string[];
  products: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateStore {
  name: string;
  location: string;
  description: string;
  owner: string;
}
