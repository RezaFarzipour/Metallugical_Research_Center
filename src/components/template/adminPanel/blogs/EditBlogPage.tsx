"use client"
import BreadcrumbsElement from '@/components/element/Breadcrumbs'
import { BlogData } from '@/types'
import React, { useState } from 'react'
import FirstStepAction from './formSteps/Stage1';
import Stage2 from './formSteps/Stage2';

const EditBlogPage = ({ blogData }: { blogData: BlogData }) => {
    const [step, setStep] = useState(2);
  return (
    <div>
    {/* <div className="mb-6">
      <BreadcrumbsElement
        item1="بلاگ ها"
        item2="ویرایش بلاگ"
        panelHref="/admin/blogs"
      />
    </div> */}

    {step === 1 && (
      <FirstStepAction blogData={blogData} setStep={setStep}  />
      
    )}

    {step === 2 && (
      <Stage2
      blogData={blogData}
      />
    )}
  </div>
  )
}

export default EditBlogPage