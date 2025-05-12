"use client"
import { postReservedService } from '@/services/api/reserve';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {

    const router = useRouter()

      //first post request when user click on continue button
  const { mutateAsync: createServiceReserve, isPending: isCreating } =
  useMutation({
    mutationKey: ["post-reserve"],
    mutationFn: postReservedService,
  });

    const handleReserve =async()=>{
        try {
            const { id } = await createServiceReserve();
            router.push(`/reservation?reserve-id=${id}`);
          } catch (e) {
            console.log("err", e);
          }
    }
  return (
    <div>

      <button onClick={handleReserve} className='border-2 border-black'>رزرو</button>
    </div>
  )
}

export default Page