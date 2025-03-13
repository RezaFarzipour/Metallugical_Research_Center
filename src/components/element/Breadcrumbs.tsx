"use client"
import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@heroui/react";
type BreadcrunmbsProps = {
  item1: string;
  item2: string;
}

const BreadcrumbsElement = ({item1,item2}: BreadcrunmbsProps) => {
  return (
    <Breadcrumbs
    size='lg'
    variant='light'
    color='white'
    itemClasses={{
      separator: "px-2",
    }}
    separator="/" >
    <BreadcrumbItem href='/' >{item1}</BreadcrumbItem>
    <BreadcrumbItem >{item2}</BreadcrumbItem>
  
  </Breadcrumbs>
  )
}

export default BreadcrumbsElement