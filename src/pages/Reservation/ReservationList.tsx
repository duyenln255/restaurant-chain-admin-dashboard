import React from 'react';
import FilterBar from './FilterBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ReservationTable from './ReservationTable';
import { ReservationItem } from '../../types/ReservationItem';

const reservations: ReservationItem[] = [
  { id: "00001", fullName: "Bob Smith", email: "jaskolski@gmail.com", phoneNumber: "+1 6546 654 542", dateTime: "30/12/2024 10:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 4, inOutdoor: "INDOOR", status: "Waiting" },
  { id: "00002", fullName: "Rosie Pearson", email: "test@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 11:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 1, inOutdoor: "INDOOR", status: "Active" },
  { id: "00003", fullName: "Darrell Caldwell", email: "test1@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 12:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 3, inOutdoor: "OUTDOOR", status: "Cancel" },
  { id: "00004", fullName: "Gilbert Johnston", email: "test2@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 13:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 1, inOutdoor: "OUTDOOR", status: "Active" },
  { id: "00005", fullName: "Alan Cain", email: "test3@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 14:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 3, inOutdoor: "INDOOR", status: "Active" },
  { id: "00006", fullName: "Alfred Murray", email: "test4@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 15:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 8, inOutdoor: "INDOOR", status: "Active" },
  { id: "00007", fullName: "Maggie Sullivan", email: "test5@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 16:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 3, inOutdoor: "INDOOR", status: "Active" },
  { id: "00008", fullName: "Rosie Todd", email: "test6@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 17:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 1, inOutdoor: "INDOOR", status: "Active" },
  { id: "00009", fullName: "Dollie Hines", email: "test7@gmail.com", phoneNumber: "077-XXX-XXXX", dateTime: "11/08/2023 18:30 AM", location: "Sài Gòn 123 Âu Cơ", people: 1, inOutdoor: "INDOOR", status: "Cancel" },
  ];

const ReservationList: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard-body p-6">
            <div className="max-w-[1140px] mx-auto space-y-4">
              
              {/* Header + Button */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800">Order Lists</h1>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                  Add New Order
                </button>
              </div>

              {/* FilterBar với Dropdown Order Type */}
              <FilterBar />

              {/* Order Table */}
              <ReservationTable items={reservations as ReservationItem[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
