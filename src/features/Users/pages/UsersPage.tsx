import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { useGetAllUsers } from "../services/UsersServices.ts";
import { openModal } from "../../../store/modal/modalSlice";
import { useAppDispatch } from "../../../store/HooksRedux";
import UserForm from "../components/UserForm.tsx";
import { TableCustoms } from "../../SharedComponents/Table/TableCustoms";

const UsersPage = () => {
  const { data, isLoading } = useGetAllUsers();

  const dispatch = useAppDispatch();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        size: 150,
      },
      {
        accessorKey: "Email",
        header: "Email",
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
        accessorKey: "DateCreate",
        header: "Fecha de Registro",
        type: "number",
        size: 100,
      },
      {
        accessorKey: "IsMeditate",
        header: "Objetivo",
        type: "date", // Use 'date' type for dates
        size: 100,
      },
      {
        accessorKey: "LastLogin",
        header: "Ultimo ingreso a la app",
        type: "boolean",
        size: 100,
      },
    ],
    [],
  );

  const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: "Usuario",
        content: <UserForm />,
      }),
    );
  };

  return (
    <>
      <h3>USUARIOS REGISTRADOS</h3>
      <div style={{ marginTop: 40 }}>
        <TableCustoms<any>
          columns={columns}
          data={data?.listaUsuarios || []}
          enableEditing={true}
          positionActionsColumn={"last"}
          handleViewProduct={() => {}}
          handleDeleteProduct={() => {}}
          handleOpenModal={handleOpenModal}
          buttonNames={{
            addProduct: "Usuario",
            addCategory: "",
          }}
          visibility={{
            addProductButton: false,
            addCategoryButton: false,
          }}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default UsersPage;
