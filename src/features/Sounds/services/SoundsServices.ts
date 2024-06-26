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
import { Moment } from "moment";

export interface SoundsCreateDto {
  name: string;
  album: string;
  fileIconoCategoria?: string | null;
  iconoCategoria?: string | null;
  fileImagenCategoria?: string | null;
  imagenCategoria?: string | null;
  fileArchivoAudio?: string | null;
  archivoAudio?: string | null;
  dayPublication: Moment | null;
  hourPublication: string | null;
  target: string;
  countReproduced?: number;
  dateCreate?: Moment | null;
  isActive: boolean;
  typePublication: string;
}

export interface SoundsRequestDto {
  id: string;
  name: string;
  album: string;
  fileIconoCategoria?: File;
  iconoCategoria?: string;
  fileImagenCategoria?: File;
  imagenCategoria?: string;
  fileArchivoAudio?: File;
  archivoAudio?: string;
  dayPublication: Date;
  hourPublication: string;
  target: string;
  countReproduced: number;
  dateCreate: Date;
  isActive: boolean;
  typePublication: string;
}

export interface SoundsFormDto {
  name: string;
  album: string;
  fileIconoCategoria?: File; // Use File type for image/audio file uploads (optional)
  iconoCategoria?: string; // Use string for existing image URL (if applicable)
  fileImagenCategoria?: File; // Use File type for image/audio file uploads (optional)
  imagenCategoria?: string; // Use string for existing image URL (if applicable)
  fileArchivoAudio?: File; // Use File type for audio file upload
  archivoAudio?: string; // Use string for existing audio file URL (if applicable)
  dayPublication: Date;
  hourPublication: string; // Use string for time representation
  target: string;
  countReproduced: number;
  dateCreate: Date;
  isActive: boolean;
  typePublication: string;
}

export interface ListSoundsDto {
  createSounds: SoundsRequestDto;
  listSoundsDetail: SoundsRequestDto[];
}

export const useGetAllSounds = (): UseQueryResult<
  ListSoundsDto,
  ResponseDto<any>
> => {
  return useQuery(
    ["getAllSounds"],
    async () => {
      const url = endPoints.sound.getAll;
      const response = await axiosInstance.get<ListSoundsDto>(url);
      return response.data;
    },
    {
      refetchOnWindowFocus: false, // cambiar si aplica
      onError: (error) => {
        console.error("Historial de Sounds no pudo ser obtenida:", error);
      },
      onSuccess: (data) => {
        console.log("Historial de Sounds obtenida", data);
      },
    },
  );
};

export const useAddSounds = (): UseMutationResult<
  SoundsRequestDto[], // success
  any, // Error type (adjust if needed)
  SoundsCreateDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (valuesData: SoundsCreateDto) => {
      const response = await axiosInstance.post(
        endPoints.sound.add, // Update to match your API endpoint
        valuesData,
      );
      console.log({ resp: response.data });
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error useAddSounds:", error);
      },
      onSuccess: (data) => {
        console.log("useAddSounds  successfully:", data);
        queryClient.invalidateQueries("getAllSounds");
      },
    },
  );
};
