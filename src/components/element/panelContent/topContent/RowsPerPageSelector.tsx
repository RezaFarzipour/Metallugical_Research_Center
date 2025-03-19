import React, { ChangeEvent } from "react";

const RowsPerPageSelector: React.FC<{
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ onRowsPerPageChange }) => (
  <label className="flex items-center text-default-400 text-small">
    تعداد ردیف‌ها:
    <select
      className="bg-transparent outline-none text-default-400 text-small"
      onChange={onRowsPerPageChange}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </label>
);

export default RowsPerPageSelector;
