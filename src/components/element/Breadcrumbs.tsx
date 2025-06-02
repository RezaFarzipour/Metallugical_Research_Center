"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

type BreadcrumbsProps = {
  item1?: string;
  item2?: string;
  panelHref?: string;
  color?:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
   
    | undefined;
};

const BreadcrumbsElement = ({
  item1,
  item2,
  color = "white",
  panelHref
}: BreadcrumbsProps) => {
  return (
    <Breadcrumbs
    className="cursor-pointer"
      size="lg"
      variant="light"
      itemClasses={{
        separator: "px-2",
      }}
      separator="/"
      color={color}
    >
      <BreadcrumbItem className="pointer" href={panelHref}>
        {item1}
      </BreadcrumbItem>
      <BreadcrumbItem className="pointer" >
        {item2}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadcrumbsElement;
