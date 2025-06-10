"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceAdmin } from "@/services/api/service";
import useExpiredReserveStore from "@/store/useExpiredReserveStore";
import React from "react";
import Header from "@/components/containers/clipedDrawer/Header";
import SideBar from "@/components/containers/clipedDrawer/SideBar";
import { adminSidebarlinks } from "@/constants/data";
import { useGetUser } from "@/hooks/useAuth";
import { Service } from "@/types";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const { data: servicesData, isLoading } = useQuery<Service[]>({
    queryKey: ["getAll-services"],
    queryFn: getAllServiceAdmin,
    staleTime: 5 * 60 * 1000,
  });

  const { setExpiredReserveDates } = useExpiredReserveStore();

  React.useEffect(() => {
    if (!servicesData || !Array.isArray(servicesData)) return;

    const expired = servicesData.flatMap((service) =>
      (service["service-reserve_date"] || [])
        .filter((res) => {
          const fromDate = new Date(res.reserved_from);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // حذف ساعت برای دقت بیشتر

          // اگر بازه‌ی رزرو با امروز هم‌پوشانی داشته باشه یا گذشته باشه
          return fromDate < today;
        })
        .map((res) => ({
          id: res.id,
          service_id: service.id,
          service_name: service.service_name,
          cover_image: service.cover_image,
          price: service.price,
          description: service.description,
        }))
    );

    setExpiredReserveDates(expired);
  }, [servicesData, setExpiredReserveDates]);

  const { data: userData, isPending } = useGetUser();

  return (
    <div className="bg-secondary-0">
      <div className="grid grid-cols-12 h-screen">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 hidden lg:block">
          <SideBar
            user={userData}
            navLinkData={adminSidebarlinks}
            path={"/admin/myProfile"}
          />
        </aside>
        <div className="col-span-12 lg:col-span-9 xl:col-span-10 h-screen flex flex-col">
          <Header
            data={userData}
            isPending={isPending || isLoading}
            warningBadge={true}
          />
          <main className="bg-default-50 rounded-tr-xl p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
            <div className="xl:max-w-screen-xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
