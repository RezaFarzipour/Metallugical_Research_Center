import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div className="table-category-wrapper overflow-x-auto rounded-xl border border-gray-200">
      <table className="table-category w-full text-sm text-gray-700 ">
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead>
      <tr className="table-category-header text-center text-gray-400">
        {children}
      </tr>
    </thead>
  );
}

interface TableBodyProps {
  children: ReactNode;
}

function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}

interface TableRowProps {
  children: ReactNode;
}

function TableRow({ children }: TableRowProps) {
  return <tr className="border-b text-center ">{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
