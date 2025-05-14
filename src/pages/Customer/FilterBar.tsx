import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterBar: React.FC = () => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [orderType, setOrderType] = useState("");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder={t("customer.search.placeholder")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      />

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[180px]"
      />

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2 w-[200px]"
      >
        <option value="">{t("customer.search.allStatuses")}</option>
        <option value="active">{t("customer.active")}</option>
        <option value="inactive">{t("customer.inactive")}</option>
        <option value="blocked">{t("customer.blocked")}</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {t("customer.search.search")}
        </button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            setKeyword("");
            setDate("");
            setStatus("");
            setOrderType("");
          }}
        >
          {t("customer.search.reset")}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
