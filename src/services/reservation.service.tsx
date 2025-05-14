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

export const getReservationById = async (id: string): Promise<Reservation> => {
  const response = await axiosInstance.get<{ reservation: Reservation }>(`/reservation/${id}`);
  return response.data.reservation;
};

export const updateReservation = async (id: string, reservation: Reservation): Promise<Reservation> => {
  const response = await axiosInstance.put<{ reservation: Reservation }>(`/reservation/${id}`, reservation);
  return response.data.reservation;
};

export const deleteReservation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/reservation/${id}`);
};
