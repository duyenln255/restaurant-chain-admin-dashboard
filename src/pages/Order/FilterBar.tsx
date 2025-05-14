import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [orderType, setOrderType] = useState("");
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder={t("orders.search.placeholder")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      />

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      />

      {/* Order Type Dropdown */}
      <select
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("orders.search.allTypes")}</option>
        <option value="AT STORE">AT STORE</option>
        <option value="ONLINE">ONLINE</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("orders.search.allStatuses")}</option>
        <option value="Completed">{t("orders.completed")}</option>
        <option value="Processing">{t("orders.processing")}</option>
        <option value="Rejected">{t("orders.cancelled")}</option>
        <option value="On Hold">{t("orders.onHold")}</option>
        <option value="In Transit">{t("orders.shipped")}</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {t("orders.search.search")}
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
          {t("orders.search.reset")}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
