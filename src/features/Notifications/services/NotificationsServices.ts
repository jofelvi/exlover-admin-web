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

export interface NotificationsDto {
  id?: string;
  notification: string;
  dayNotification: Date;
  hourNotification: Date;
  target: string;
  dateCreate: Date;
  isActive: boolean;
  aspNetUserId?: string;
  deleted: boolean;
  typeNotification: string;
}

export interface NotificationsRequestDto {
  id?: string;
  notification: string;
  dayNotification: Moment | null;
  hourNotification: string | null;
  target: string;
  typeNotification: string;
  isActive: boolean;
  deleted: boolean;
  aspNetUserId?: string;
}

export interface ListNotificationsDto {
  createNotification: NotificationsDto;
  listaNotification: NotificationsDto[];
  historyNotification: NotificationsDto[];
}

export const useAddNotifications = (): UseMutationResult<
  ResponseDto<NotificationsDto>, // success
  ResponseDto<null>, // Error type (adjust if needed)
  NotificationsRequestDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (Data: NotificationsRequestDto) => {
      const response = await axiosInstance.post(
        endPoints.notifications.add,
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
        queryClient.invalidateQueries("getAllNotifications");
      },
    },
  );
};

export const useUpdateNotifications = (): UseMutationResult<
  ResponseDto<NotificationsDto>, // success
  ResponseDto<null>, // Error type (adjust if needed)
  NotificationsRequestDto,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (Data: NotificationsRequestDto) => {
      const response = await axiosInstance.post(
        endPoints.notifications.update,
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
        console.log("useUpdateNotifications added successfully:", data);
        queryClient.invalidateQueries("getAllNotifications");
      },
    },
  );
};

export const useDeleteNotifications = (): UseMutationResult<
  ResponseDto<NotificationsDto>, // success
  ResponseDto<null>, // Error type (adjust if needed)
  string,
  unknown // Context type (optional)
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      const response = await axiosInstance.delete(
        endPoints.notifications.delete(id),
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
        queryClient.invalidateQueries("getAllNotifications");
      },
    },
  );
};

export const useGetAllNotifications = (): UseQueryResult<
  ListNotificationsDto,
  ResponseDto<any>
> => {
  return useQuery(
    ["getAllNotifications"],
    async () => {
      const url = endPoints.notifications.getAll;
      const response =
        await axiosInstance.get<ResponseDto<ListNotificationsDto>>(url);
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
