export type NewBookDTO = {
  id?: number;
  name: string;
  uuid: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
};

export type LoadBookDTO = {
  id: number;
  name: string;
  uuid: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateBookDTO = {
  name: string;
  uuid: string;
  price: number;
};
