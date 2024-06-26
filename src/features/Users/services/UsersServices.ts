import { useQuery, UseQueryResult } from "react-query";
import { ResponseDto } from "../../Auth/services/auth";
import endPoints from "../../../config/endpoints";
import axiosInstance from "../../../config/axiosInstance";

export interface usersListDto {
  etapasInteractuadas: any; // Replace with specific types if known
  etapasIgnoradas: any; // Replace with specific types if known
  meditacionesTerminadasSuperacion: any[]; // List of any
  duermeTerminadasSuperacion: any[]; // List of any
  diasRuptura: string;
  diasSinContactoEx: string;
  costoConEx: boolean;
  botonPanico: number;
  escribeleAEx: string;
  entroSeccionMiTila: string;
  diasSinEntrarMiTila: string;
  fasePlantitaSuperar: string;
  listaUsuarios: any[]; // List of any
  userDetailId: string;
}

export const useGetAllUsers = (): UseQueryResult<
  usersListDto,
  ResponseDto<any>
> => {
  return useQuery(
    ["getAllUsers"],
    async () => {
      const url = endPoints.user.getAll;
      const response = await axiosInstance.get<any>(url);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Get all users no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Get all users obtenida", data);
      },
    },
  );
};
