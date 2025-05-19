"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { ComboboxCustom } from "../../components/Combobox/Combobox";

interface FilterBarProps {
  onFilterChange: (filters: {
    full_name?: string;
    date_added?: string;
    status?: string;
    type?: string;
    branch?: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState("all");
  const [orderType, setOrderType] = useState("all");
  const [orderBranch, setOrderBranch] = useState("all");

  const handleSearch = () => {
    const filters = {
      full_name: keyword !== "all" ? keyword : undefined,
      date_added: date ? date.toISOString().split("T")[0] : undefined,
      status: status !== "all" ? status : undefined,
      type: orderType !== "all" ? orderType : undefined,
      branch: orderBranch !== "all" ? orderBranch : undefined,
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setKeyword("all");
    setDate(undefined);
    setStatus("all");
    setOrderType("all");
    setOrderBranch("all");
    onFilterChange({}); // clear filters
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4">
      {/* Customer Keyword */}
      <ComboboxCustom
        data={[]} // TODO: populate if needed
        value={keyword}
        onChange={setKeyword}
        placeholder="Search customer..."
        className="w-full sm:flex-1 border border-neutral-300"
      />

      {/* Created Date */}
      <CustomDatePicker
        value={date}
        onChange={setDate}
        placeholder="Select created date"
      />

      {/* Order Type */}
      <Select value={orderType} onValueChange={setOrderType}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Order Types ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Order Types ---</SelectItem>
          <SelectItem value="AT STORE">AT STORE</SelectItem>
          <SelectItem value="ONLINE">ONLINE</SelectItem>
        </SelectContent>
      </Select>

      {/* Branch */}
      <Select value={orderBranch} onValueChange={setOrderBranch}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Branches ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Branches ---</SelectItem>
          <SelectItem value="92 Maple Crescent, Rochester, NY 1114620">
            92 Maple Crescent
          </SelectItem>
          <SelectItem value="123 Main Street, Chicago, IL 60601">
            123 Main Street
          </SelectItem>
          {/* TODO: Dynamically fetch if needed */}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Status ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Status ---</SelectItem>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="On Hold">On Hold</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
          <SelectItem value="In Transit">In Transit</SelectItem>
        </SelectContent>
      </Select>

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
