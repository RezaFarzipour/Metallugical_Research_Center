import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

function Table({ children, className }: TableProps) {
  return (
    <div className={`table-category-wrapper overflow-x-auto rounded-xl border border-gray-200 shadow ${className ?? ""}`}>
      <table className="table-category w-full text-sm text-gray-700">{children}</table>
    </div>
  );
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead>
      <tr className={`table-category-header text-center text-gray-500 bg-gray-100 ${className ?? ""}`}>
        {children}
      </tr>
    </thead>
  );
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={className}>{children}</tbody>;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

function TableRow({ children, className }: TableRowProps) {
  return (
    <tr
      className={`border-b text-center hover:bg-gray-50 transition-colors ${className ?? ""}`}
    >
      {children}
    </tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
