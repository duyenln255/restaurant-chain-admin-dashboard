import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterBar: React.FC = () => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [brand, setBrand] = useState("");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder={t("branch.search.placeholder")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      />

      {/* Location Dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">{t("branch.search.allLocations")}</option>
      </select>

      {/* Manager Dropdown */}
      <select
        value={manager}
        onChange={(e) => setManager(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">{t("branch.search.allManagers")}</option>
      </select>

      {/* Brand Dropdown */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">{t("branch.search.allBrands")}</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">{t("branch.search.allStatuses")}</option>
        <option value="active">{t("branch.active")}</option>
        <option value="inactive">{t("branch.inactive")}</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {t("branch.search.search")}
        </button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            setKeyword("");
            setStatus("");
            setLocation("");
            setManager("");
            setBrand("");
          }}
        >
          {t("branch.search.reset")}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
