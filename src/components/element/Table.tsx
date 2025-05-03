import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div className="bg-secondary-0 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}

interface TableHeaderProps {
  children: ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
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
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
