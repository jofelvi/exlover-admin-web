import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { ResponseDto } from "../../Auth/services/auth";
import endPoints from "../../../config/endpoints";
import axiosInstance from "../../../config/axiosInstance";
import { Moment } from "moment/moment";

export interface SleepResponseDto {
  id: string;
  name: string;
  categoryName: string;
  selectCategory?: string[]; // Use string[] for pre-selected category options (if needed)
  iconoCategoria?: string; // Use string for existing image URL (if applicable)
  imagenCategoria?: string; // Use string for existing image URL (if applicable)
  archivoDuerme?: string; // Use string for existing audio file URL (if applicable)
  dayPublication: Date;
  hourPublication: string; // Use string for time representation
  target: string;
  countReproduced: number;
  dateCreate: Date;
  isActive: boolean;
  typePublication: string;
}

export interface SleepRequestDto {
  name: string;
  categoryName: string;
  target: string;
  dayPublication: Moment | null;
  hourPublication: string | null; // Use string for time representation
  typePublication: string;
  fileIconoCategoria?: string | null;
  fileImagenCategoria?: string | null;
  fileArchivoDuerme?: string | null;
  iconoCategoria?: string | null;
  imagenCategoria?: string | null;
  archivoDuerme?: string | null;
}

export interface ListSleepDto {
  createSleep: SleepResponseDto;
  listSleepDetail: SleepResponseDto[];
}

export const useAddSleep = (): UseMutationResult<
  ResponseDto<SleepResponseDto>, // success
  ResponseDto<null>, // Error type (adjust if needed)
  SleepRequestDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (Data: SleepRequestDto) => {
      const response = await axiosInstance.post(endPoints.sleep.add, Data);
      console.log({ resp: response.data });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error useAddNotifications:", error);
      },
      onSuccess: (data) => {
        console.log("useAddCampaign added successfully:", data);
        queryClient.invalidateQueries("getAllSleeps");
      },
    },
  );
};

export const useGetAllSleeps = (): UseQueryResult<
  ListSleepDto,
  ResponseDto<any>
> => {
  return useQuery(
    ["getAllSleeps "],
    async () => {
      const url = endPoints.sleep.getAll;
      const response = await axiosInstance.get<ResponseDto<ListSleepDto>>(url);
      console.log(response.data);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Lista de useGetAllSleeps no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Lista de Notifications obtenida", data);
      },
    },
  );
};
