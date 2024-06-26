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

export interface MeditationCreateAudioDto {
  aspNetUserId?: string | null;
  name?: string | null;
  categoryName?: string | null;
  categoryId: number;
  selectcategory?: string | null;
  description?: string | null;
  fileIconoCategoria?: string | null;
  iconoCategoria?: string | null;
  fileImagenCategoria?: string | null;
  imagenCategoria?: string | null;
  fileArchivoVoz?: string | null;
  archivoVoz?: string | null;
  fileArchivoMusica?: string | null;
  archivoMusica?: string | null;
  dayPublication?: Moment | null;
  hourPublication?: string | null;
  target?: string | null;
  countReproduced?: number | null;
  isActive?: boolean | null;
  typePublication?: string | null;
}

export interface MeditationResponseDto {
  id: string;
  aspNetUserId: string;
  name: string;
  categoryName: string;
  categoryId: number;
  selectCategory?: string[] | null; // Use string[] for pre-selected category options (if needed)
  description: string;
  iconoCategoria?: string | null; // Use string for existing image URL (if applicable)
  imagenCategoria?: string | null; // Use string for existing image URL (if applicable)
  archivoVoz?: string | null; // Use string for existing audio file URL (if applicable)
  archivoMusica?: string; // Use string for existing music file URL (if applicable)
  dayPublication: Date;
  hourPublication: string; // Use string for time representation
  target: string;
  countReproduced: number;
  dateCreate: Date;
  isActive: boolean;
  typePublication: string;
}

export interface CatMeditationCategoryDto {
  id: number;
  name: string;
  isActive: boolean;
}

export const useAddMeditation = (): UseMutationResult<
  ResponseDto<MeditationCreateAudioDto>, // success
  ResponseDto<null>, // Error type (adjust if needed)
  MeditationCreateAudioDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (Data: MeditationCreateAudioDto) => {
      const response = await axiosInstance.post(
        endPoints.meditations.add,
        Data,
      );
      console.log({ resp: response.data });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error useAddNotifications:", error);
      },
      onSuccess: (data) => {
        console.log("useAddCampaign added successfully:", data);
        queryClient.invalidateQueries("getAllMeditation");
      },
    },
  );
};

export const useUpdateMeditation = (): UseMutationResult<
  MeditationCreateAudioDto, // success
  ResponseDto<null>, // Error type (adjust if needed)
  MeditationCreateAudioDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (Data: MeditationCreateAudioDto) => {
      const response = await axiosInstance.put(
        endPoints.meditations.update,
        Data,
      );
      console.log({ resp: response.data });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error useUpdateMeditation:", error);
      },
      onSuccess: (data) => {
        console.log("useUpdateMeditation added successfully:", data);
        queryClient.invalidateQueries("getAllMeditation");
      },
    },
  );
};

export const useDeleteMeditation = (): UseMutationResult<
  MeditationCreateAudioDto, // success
  ResponseDto<null>, // Error type (adjust if needed)
  string,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      const response = await axiosInstance.delete(
        endPoints.meditations.delete(id),
      );
      console.log({ resp: response.data });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error useUpdateMeditation:", error);
      },
      onSuccess: (data) => {
        console.log("useUpdateMeditation added successfully:", data);
        queryClient.invalidateQueries("getAllMeditation");
      },
    },
  );
};

export const useGetAllMeditations = (): UseQueryResult<
  MeditationResponseDto[],
  ResponseDto<any>
> => {
  return useQuery(
    ["getAllMeditation "],
    async () => {
      const url = endPoints.meditations.getAll;
      const response =
        await axiosInstance.get<ResponseDto<MeditationResponseDto[]>>(url);
      console.log(response.data);
      return response.data;
    },
    {
      refetchOnWindowFocus: false, // cambiar si aplica
      onError: (error) => {
        console.error("Lista de Notifications no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Lista de Notifications obtenida", data);
      },
    },
  );
};

export const useGetAllCategoriesMeditations = (): UseQueryResult<
  CatMeditationCategoryDto[],
  ResponseDto<any>
> => {
  return useQuery(
    ["GetAllCategoriesMeditations "],
    async () => {
      const url = endPoints.meditations.getAllCategories;
      const response = await axiosInstance.get<CatMeditationCategoryDto[]>(url);
      console.log(response.data);
      return response.data;
    },
    {
      refetchOnWindowFocus: false, // cambiar si aplica
      onError: (error) => {
        console.error("Lista de categorias no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Lista de categorias obtenida", data);
      },
    },
  );
};
