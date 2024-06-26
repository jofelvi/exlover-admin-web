import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { useGetAllSounds } from "../services/SoundsServices.ts";
import { openModal } from "../../../store/modal/modalSlice";
import { useAppDispatch } from "../../../store/HooksRedux";
import SoundForm, { SoundFormDto } from "../components/SoundForm.tsx";
import { TableCustoms } from "../../SharedComponents/Table/TableCustoms";
import { toast } from "react-toastify";
import moment from "moment/moment";

const SoundPage = () => {
  const { data, isLoading } = useGetAllSounds();
  const dispatch = useAppDispatch();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        size: 150,
      },
      {
        accessorKey: "dayPublication",
        header: "Fecha",
        type: "date",
        size: 100,
      },
      {
        accessorKey: "target",
        header: "Target",
        type: "date",
        size: 100,
      },
      {
        accessorKey: "typePublication",
        header: "Type",
        type: "number",
        size: 100,
      },
      {
        accessorKey: "album",
        header: "Album",
        type: "date",
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
    const itemParse: SoundFormDto | undefined = item
      ? {
          name: item.name,
          dayPublication: item.dayPublication
            ? moment(item.dayPublication)
            : null,
          hourPublication: item.hourPublication
            ? moment(item.hourPublication, "HH:mm:ss")
            : null,
          target: item.target,
          album: item.album,
        }
      : undefined;

    dispatch(
      openModal({
        tittle: item
          ? isViewMode
            ? "Ver Sound"
            : "Editar Sound"
          : "Nuevo Sound",
        content: (
          <SoundForm sound={itemParse} isViewMode={isViewMode} id={item.id} />
        ),
      }),
    );
  };

  const handleEdit = (item: any) => {
    handleOpenModal(item);
  };

  const handleView = (item: any) => {
    handleOpenModal(item, true);
  };

  const handleDelete = async (itemId: string) => {
    try {
      //await deleteNotificationMutation.mutateAsync(notificationId);
      toast.success("Sound eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar la notificación");
      console.error("Error deleting notification:", error);
    }
  };
  return (
    <>
      <SoundForm />
      <div style={{ marginTop: 40 }}>
        <TableCustoms<any>
          columns={columns}
          data={data?.listSoundsDetail || []}
          enableEditing={true}
          positionActionsColumn={"last"}
          handleViewProduct={handleView}
          handleDeleteProduct={handleDelete}
          handleOpenModal={() => handleOpenModal()}
          handleEditProduct={handleEdit}
          buttonNames={{
            addProduct: "Sounds",
            addCategory: "",
          }}
          visibility={{
            addProductButton: true,
            addCategoryButton: false,
          }}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default SoundPage;
