import axiosInstance from "../lib/axiosInstance";

export interface Reservation {
  id: string;
  display_id: string;
  full_name: string;
  phone: string;
  branch_id: string;
  reservation_time: string;
  reservation_date: string;
  number_of_customer: number;
  status: string;
  place: string;
  date_added: string;
  brand_name: string;
  branch_address: string;
}

export const getAllReservations = async (): Promise<Reservation[]> => {
  const response = await axiosInstance.get<{ reservation: Reservation[] }>("/reservation");
  return response.data.reservation;
};
