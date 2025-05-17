

import http from "../httpService";

export const getAllReserveCustomer = async () => {
  try {
    const response = await http.get(`/reserve`);
    console.log(response.data, "response.data");
    return response.data;

  } catch (error) {
    console.log(error, "error");

  }
};


export const getReserveCustomerById = async (reserveId: string | null) => {
  const response = await http.get(`/reserve?reserve-id=${reserveId}`);
  return response.data;
};

// stage1
export const postReservedService = async () => {
  const response = await http.post(`/reserve`);
  return response.data;
};



export async function patchReserveDetails({
  reserveId,
  reserve_from,
  reserve_to,
  service,
}: {
  reserve_from: string | null;
  reserve_to: string | null;
  service: string | null  | undefined;
  reserveId: string | null;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      reserve_from,
      reserve_to,
      service,
    }
  );

  return response.data;
}

//stage2

export async function patchAcceptStage2({
  reserveId,
  is_reservation_time_verified,
  admin_description,
  reserve_duration,
  total_price,
}: {
  reserve_duration: number;
  is_reservation_time_verified: boolean;
  admin_description: string;
  reserveId: string | null;
  total_price: number;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      is_reservation_time_verified,
      admin_description,
      reserve_duration,
      total_price,
    }
  );

  return response.data;
}


export async function PatchRejectStage2({
  reserveId,
  admin_description,
  service,
}: {
  admin_description: string;
  reserveId: string | null;
  service: string | undefined;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=0`,
    {
      admin_description,
      service,
    }
  );

  return response.data;
}

//stage 3

export async function sendReceipt({
  reserveId,
  data,
}: {
  reserveId: string | null;
  data: FormData;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,

    data
  );

  return response.data;
}

export async function paymentVerified({
  reserveId,
  is_payment_verified,
}: {
  reserveId: string | null;
  is_payment_verified: boolean;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      is_payment_verified,
    }
  );

  return response.data;
}



export async function rejectPayment({
  reserveId,
  is_payment_verified,
}: {
  reserveId: string | null;
  is_payment_verified: boolean | undefined;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=0`,
    {
      is_payment_verified,
    }
  );

  return response.data;
}


//stage5

export async function adminFinalApprove({
  reserveId,
  is_finished,
}: {
  reserveId: string | null;
  is_finished: boolean;
}): Promise<any> {
  const response = await http.patch(
    `/reserve?reserve-id=${reserveId}&next-stage=1`,
    {
      is_finished,
    }
  );

  return response.data;
}


//customer cancle reserve

export async function cancleFunc({
  reserveId,

}: {
  reserveId: string | null;

}): Promise<any> {
  const response = await http.delete(
    `/reserve?reserve-id=${reserveId}`,


  );

  return response.data;
}

