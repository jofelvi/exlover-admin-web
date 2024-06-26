import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { openModal } from "../../../store/modal/modalSlice";
import { useAppDispatch } from "../../../store/HooksRedux";
import { TableCustoms } from "../../SharedComponents/Table/TableCustoms.tsx";
import MeditationAudioForm, {
  MeditationAudioFormValues,
} from "../components/MeditationForm.tsx";
import {
  useDeleteMeditation,
  useGetAllMeditations,
} from "../services/MeditacionsServices.ts";
import { Box } from "@mui/material";
import moment from "moment/moment";
import { toast } from "react-toastify";

const MeditationsPage = () => {
  const { data, isLoading } = useGetAllMeditations();
  const dispatch = useAppDispatch();
  const { mutateAsync: deleteMeditation, isSuccess } = useDeleteMeditation();
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
        size: 100,
        Cell: ({ cell }) => (
          <Box>
            {moment((cell.getValue() as string) || "").format("DD-MM-YYYY")}
          </Box>
        ),
      },
      {
        accessorKey: "target", // Assuming 'startDate' also maps to 'dayPublication'
        header: "Target",
        type: "date", // Use 'date' type for dates
        size: 100,
      },
      {
        accessorKey: "typePublication",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "categoryName",
        header: "Categoria",
        type: "date", // Use 'date' type for dates
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
    const itemParse: MeditationAudioFormValues | undefined = item
      ? {
          name: item.name,
          dayPublication: item.dayPublication,
          hourPublication: item.hourPublication
            ? moment(item.hourPublication, "HH:mm:ss")
            : null,
          target: item.target,
          category: {
            id: item.categoryId,
            name: item.categoryName,
          },
        }
      : undefined;

    dispatch(
      openModal({
        tittle: "",
        content: (
          <MeditationAudioForm
            meditacion={itemParse}
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

  const handleDeleteNotification = async (item: any) => {
    try {
      console.log({ item });
      await deleteMeditation(item);
      toast.success("Meditacion eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la notificación");
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <>
      <h3>MEDITACIONES</h3>
      <MeditationAudioForm />
      <TableCustoms<any>
        columns={columns}
        data={data || []}
        enableEditing={true}
        positionActionsColumn={"last"}
        handleViewProduct={handleViewNotification}
        handleDeleteProduct={handleDeleteNotification}
        handleOpenModal={() => handleOpenModal()}
        handleEditProduct={handleEditNotification}
        buttonNames={{
          addProduct: "Meditacion",
          addCategory: "null",
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

export default MeditationsPage;
