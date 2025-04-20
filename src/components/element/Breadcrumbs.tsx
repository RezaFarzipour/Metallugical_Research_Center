"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

type BreadcrumbsProps = {
  item1?: string;
  item2?: string;
  panelHref?: string;
};

const BreadcrumbsElement = ({ item1, item2, panelHref }: BreadcrumbsProps) => {
  return (
    <Breadcrumbs
      size="lg"
      variant="light"
      itemClasses={{
        separator: "px-2",
      }}
      separator="/"
    >
      <BreadcrumbItem className="pointer" href={panelHref}>
        {item1}
      </BreadcrumbItem>
      <BreadcrumbItem className="pointer" href="/">
        {item2}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadcrumbsElement;
