import { BtnLoader } from '@/components/element/Loader'
import { AdminCourses } from '@/components/template/adminPanel/courses/AdminCourses'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense
    fallback={
      <div>
        <BtnLoader />
      </div>
    }
  >
    <AdminCourses />
  </Suspense>
  )
}

export default page