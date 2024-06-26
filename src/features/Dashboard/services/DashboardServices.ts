import { useQuery, UseQueryResult } from "react-query";
import { ResponseDto } from "../../Auth/services/auth";
import endPoints from "../../../config/endpoints";
import axiosInstance from "../../../config/axiosInstance";

export interface VentasHistoryDto {
  dateCreate: Date;
  amount: number;
  typeMembership: string;
}
export interface DashboardViewModelDto {
  totalRegister: number;
  totalMembership: number;
  totalSuperacion: number;
  totalSuperacionMen: number;
  totalSuperacionWomen: number;
  totalMeditacion: number;
  totalMeditacionMen: number;
  totalMeditacionWomen: number;
  membershipActual: number;
  membershipAnterior: number;
  listaIngresos: VentasHistoryDto[];
}

export const useGetDashboard = (): UseQueryResult<
  DashboardViewModelDto,
  ResponseDto<any>
> => {
  return useQuery(
    ["getDashboard"],
    async () => {
      const url = endPoints.dashboard.getAll;
      const response = await axiosInstance.get<DashboardViewModelDto>(url);
      return response.data;
    },
    {
      refetchOnWindowFocus: false, // cambiar si aplica
      onError: (error) => {
        console.error("Dashboard no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Dashboard obtenida", data);
      },
    },
  );
};
