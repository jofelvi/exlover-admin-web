import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { openModal } from "../../../store/modal/modalSlice";
import { useAppDispatch } from "../../../store/HooksRedux";
import { TableCustoms } from "../../SharedComponents/Table/TableCustoms.tsx";
import { useGetAllSleeps } from "../services/DuermesServices.ts";
import DuermeForm from "../Components/DuermeForm.tsx";
import { Box, Typography } from "@mui/material";

const DuermePage = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetAllSleeps();

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
        type: "date", // Use 'date' type for dates
        size: 100,
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
        type: "number",
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

  const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: "Agregar Datos A Dormir",
        content: <DuermeForm />,
      }),
    );
  };

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <>
      <DuermeForm />
      <TableCustoms<any>
        columns={columns}
        data={data?.listSleepDetail || []}
        enableEditing={true}
        positionActionsColumn={"last"}
        handleViewProduct={() => {}}
        handleDeleteProduct={() => {}}
        handleOpenModal={handleOpenModal}
        buttonNames={{
          addProduct: "Duerme",
          addCategory: "",
        }}
        visibility={{
          addProductButton: true,
          addCategoryButton: false,
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default DuermePage;
