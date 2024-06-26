import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { openModal } from "../../../store/modal/modalSlice";
import { useAppDispatch } from "../../../store/HooksRedux";
import NotificationForm, {
  NotificationFormDto,
} from "../components/NotificationForm.tsx";
import { TableCustoms } from "../../SharedComponents/Table/TableCustoms.tsx";
import {
  useDeleteNotifications,
  useGetAllNotifications,
} from "../services/NotificationsServices.ts";
import moment from "moment";
import { toast } from "react-toastify";

const NotificationsPage = () => {
  const { data, isLoading } = useGetAllNotifications();
  const { mutateAsync: deleteNotifications, isSuccess } =
    useDeleteNotifications();

  const dispatch = useAppDispatch();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: "notification", header: "Nombre", size: 150 },
      {
        accessorKey: "dayNotification",
        header: "Fecha",
        size: 100,
        Cell: ({ cell }) => (
          <Box>
            {moment((cell.getValue() as string) || "").format("DD-MM-YYYY")}
          </Box>
        ),
      },
      {
        accessorKey: "hourNotification",
        header: "Hora",
        type: "string",
        size: 100,
      },
      {
        accessorKey: "target",
        header: "Target",
        type: "number",
        size: 100,
      },
      {
        accessorKey: "isActive",
        header: "Status",
        type: "boolean",
        size: 100,
        Cell: ({ cell }) => (
          <Box>{cell.getValue() ? "Activo" : "Inactivo"}</Box>
        ),
      },
    ],
    [],
  );

  const handleOpenModal = (item?: any, isViewMode: boolean = false) => {
    const itemParse: NotificationFormDto | undefined = item
      ? {
          notification: item.notification,
          dayNotification: item.dayNotification
            ? moment(item.dayNotification)
            : null,
          hourNotification: item.hourNotification
            ? moment(item.hourNotification, "HH:mm:ss")
            : null,
          target: item.target,
        }
      : undefined;

    dispatch(
      openModal({
        tittle: "",
        content: (
          <NotificationForm
            notification={itemParse}
            isViewMode={isViewMode}
            id={item.id}
          />
        ),
      }),
    );
  };

  const handleEditNotification = (item: any) => {
    handleOpenModal(item);
  };

  const handleViewNotification = (item: any) => {
    handleOpenModal(item, true);
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotifications(id);
      toast.success("Notificación eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la notificación");
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <>
      <h3>NOTIFICACIONES</h3>
      <NotificationForm />
      <TableCustoms<any>
        columns={columns}
        data={data?.historyNotification || []}
        enableEditing={true}
        positionActionsColumn="last"
        handleViewProduct={handleViewNotification}
        handleDeleteProduct={handleDeleteNotification}
        handleOpenModal={() => handleOpenModal()}
        handleEditProduct={handleEditNotification}
        buttonNames={{
          addProduct: "Nueva Notificación",
          addCategory: "Categoria",
        }}
        visibility={{
          addProductButton: false,
          addCategoryButton: false,
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default NotificationsPage;
