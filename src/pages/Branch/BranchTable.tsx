import React from "react";
import { useTranslation } from "react-i18next";
import type { BranchItem } from "../../types/BranchItem";
import GenericTable from "../../components/Table/GenericTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface BranchTableProps {
  items: BranchItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BranchTable: React.FC<BranchTableProps> = ({
  items,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const renderStatus = (status: BranchItem["status"]) => {
    const colorMap: Record<string, string> = {
      Active: "bg-green-100 text-green-700",
      Inactive: "bg-gray-200 text-gray-600",
      Stop: "bg-red-100 text-red-700",
      Prepare: "bg-yellow-100 text-yellow-700",
    };

    const statusText =
      status === "Active" ? t("branch.active") : t("branch.inactive");

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm ${colorMap[status] || "bg-gray-200 text-gray-600"} whitespace-nowrap`}
      >
        {statusText}
      </span>
    );
  };

  const columns: {
    key: keyof BranchItem | "action" | "_index";
    label: string;
    align?: "center" | "left" | "right";
    render?: (item: BranchItem) => React.ReactNode;
  }[] = [
    {
      key: "_index",
      label: t("orders.no"),
      align: "center",
      render: (item) => (
        <span className="text-gray-600 text-sm">
          {item.displayId || items.findIndex((i) => i.id === item.id) + 1}
        </span>
      ),
    },
    {
      key: "address",
      label: t("branch.address"),
      render: (item) => (
        <div
          className="text-sm overflow-hidden whitespace-nowrap text-ellipsis "
          title={item.address}
        >
          {item.address}
        </div>
      ),
    },
    {
      key: "phone",
      label: t("branch.phone"),
      render: (item) => (
        <div
          className="text-sm overflow-hidden whitespace-nowrap text-ellipsis"
          title={item.phone}
        >
          {item.phone}
        </div>
      ),
    },
    {
      key: "brand",
      label: t("branch.brand"),
      render: (item) => (
        <div
          className="text-sm overflow-hidden whitespace-nowrap text-ellipsis"
          title={item.brand}
        >
          {item.brand}
        </div>
      ),
    },
    {
      key: "employees",
      label: t("branch.staffCount"),
      render: (item) => (
        <div className="text-sm">{item.totalStaffs || "0"}</div>
      ),
    },
    {
      key: "status",
      label: t("branch.status"),
      render: (item) => renderStatus(item.status),
    },
    {
      key: "action",
      label: t("common.actions"),
      align: "center",
      render: (item) => (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onEdit(item.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faPen} size="sm" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <GenericTable<BranchItem>
        items={items}
        columns={columns}
        itemsPerPage={10}
      />
    </div>
  );
};

export default BranchTable;
