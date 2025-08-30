import { BtnLoader } from "@/components/element/Loader";
import Courses from "@/components/template/courses/CoursesPage";
import { getAllServiceCustomer } from "@/services/api/service";
import { Suspense } from "react";

async function CoursesPage() {
  const data = await getAllServiceCustomer();

  const courses = data.filter((course:any) => course.is_package);

  return (
    <Suspense
      fallback={
        <div>
          <BtnLoader />
        </div>
      }
    >
      <Courses initialData={courses} />;{" "}
    </Suspense>
  );
}
export default CoursesPage;
