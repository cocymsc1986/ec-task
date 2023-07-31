export type User = {
  id: string;
  name: string;
  email: string;
};

export type Parc = {
  id: string;
  name: string;
  description: string;
};

export type Booking = {
  id: string;
  user: string;
  parc: string;
  bookingdate: string;
  comments: string;
};

export type Error = {
  status: number;
  message: string;
};
