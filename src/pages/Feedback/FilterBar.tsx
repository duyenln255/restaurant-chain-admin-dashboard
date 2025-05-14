import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackEmployee, setFeedbackEmployee] = useState("");
  const [feedbackBranch, setFeedbackBranch] = useState("");
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-x-4 gap-y-3">
      {/* Keyword Input */}
      <input
        type="text"
        placeholder={t("feedback.search.placeholder")}
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

      {/* Feedback Type Dropdown */}
      <select
        value={feedbackType}
        onChange={(e) => setFeedbackType(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("feedback.search.allTypes")}</option>
        <option value="KHIẾU NẠI">{t("feedback.complaint")}</option>
        <option value="GÓP Ý">{t("feedback.suggestion")}</option>
      </select>

      {/* Employee responsible Dropdown */}
      <select
        value={feedbackEmployee}
        onChange={(e) => setFeedbackEmployee(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("feedback.search.allEmployees")}</option>
      </select>

      {/* Branch responsible Dropdown */}
      <select
        value={feedbackBranch}
        onChange={(e) => setFeedbackBranch(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("feedback.search.allBranches")}</option>
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-neutral-300 rounded-md px-3 py-2"
      >
        <option value="">{t("feedback.search.allStatuses")}</option>
        <option value="Pending">{t("feedback.pending")}</option>
        <option value="Done">{t("feedback.done")}</option>
        <option value="Cancel">{t("feedback.cancel")}</option>
        <option value="Verify">{t("feedback.verify")}</option>
      </select>

      {/* Search & Reset Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {t("feedback.search.search")}
        </button>
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            setKeyword("");
            setDate("");
            setStatus("");
            setFeedbackType("");
            setFeedbackEmployee("");
            setFeedbackBranch("");
          }}
        >
          {t("feedback.search.reset")}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
