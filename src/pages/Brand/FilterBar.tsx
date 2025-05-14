"use client";

import React, { useEffect, useState } from "react";
import { ComboboxCustom } from "../../components/Combobox/Combobox";
import { Button } from "../../components/ui/button";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { getAllBrands } from "../../services/brand.service";
import type { Brand } from "../../services/brand.service";
import { useTranslation } from "react-i18next";

interface FilterBarProps {
  onFilterChange: (filters: {
    brandId: string;
    status: string;
    dateAdded?: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, []);

  const statusOptions = Array.from(new Set(brands.map((b) => b.status))).map(
    (status) => ({
      value: status,
      label: t(`brand.${status.toLowerCase()}`),
    })
  );
  statusOptions.unshift({ value: "all", label: t("brand.search.status") });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4 xs:max-w-screen xs:mx-auto">
      {/* Brand Combobox */}
      <ComboboxCustom
        data={brands.map((b) => ({ value: b.id, label: b.name }))}
        value={selectedBrand}
        onChange={setSelectedBrand}
        placeholder={t("brand.search.placeholder")}
        className="w-full sm:flex-1 border border-neutral-300 focus-visible:ring-1 focus-visible:ring-blue-500"
      />

      {/* Status Select */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="bg-white w-full sm:flex-1 focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder={t("brand.search.status")} />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CustomDatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder={t("brand.search.dateAdded")}
      />

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() =>
            onFilterChange({
              brandId: selectedBrand,
              status,
              dateAdded: selectedDate?.toISOString().split("T")[0],
            })
          }
        >
          {t("common.search")}
        </Button>

        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => {
            setSelectedBrand("");
            setStatus("all");
            setSelectedDate(undefined);
          }}
        >
          {t("common.reset")}
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
