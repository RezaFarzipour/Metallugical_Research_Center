"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

type BreadcrumbsProps = {
  item1?: string;
  item2?: string;
  panelHref: string;
};

const BreadcrumbsElement = ({ item1, item2, panelHref }: BreadcrumbsProps) => {
  return (
    <Breadcrumbs
      size="lg"
      variant="light"
      color="primary"
      itemClasses={{
        separator: "px-2",
      }}
      separator="/"
    >
      <BreadcrumbItem href="/">{item1}</BreadcrumbItem>
      <BreadcrumbItem href={panelHref}>{item2}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadcrumbsElement;
