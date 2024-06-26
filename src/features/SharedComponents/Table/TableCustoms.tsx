import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface ProductTableProps<T> {
  columns: any[];
  data: any[];
  enableEditing: boolean;
  positionActionsColumn: "first" | "last";
  handleViewProduct: (item: T) => void;
  handleEditProduct?: (item: T) => void;
  handleDeleteProduct: (item: T) => void;
  handleOpenModal: () => void;
  buttonNames: {
    addProduct: string;
    addCategory: string;
  };
  visibility: {
    addProductButton: boolean;
    addCategoryButton: boolean;
  };
  isLoading?: boolean;
}

export const TableCustoms = <T,>({
  columns,
  data,
  enableEditing,
  positionActionsColumn,
  handleViewProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleOpenModal,
  buttonNames,
  visibility,
  isLoading,
}: ProductTableProps<T>) => {
  const renderRowActions = ({ row }: { row: any; table: any }) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleViewProduct(row.original)}>
          <RemoveRedEyeIcon color="action" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton
          onClick={() => handleEditProduct && handleEditProduct(row.original)}
        >
          <EditIcon color="action" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton
          color="error"
          onClick={() => handleDeleteProduct(row.original.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderTopToolbarCustomActions = ({ table }: { table: any }) => (
    <div>
      {visibility.addProductButton && (
        <Button
          style={{ marginRight: 10 }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          {buttonNames.addProduct}
        </Button>
      )}
      {visibility.addCategoryButton && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => table.setCreatingRow(true)}
        >
          {buttonNames.addCategory}
        </Button>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh", // Ajusta esto según sea necesario
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
        <Typography sx={{ color: "white", marginTop: 2, textAlign: "center" }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ paddingTop: 30 }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableEditing={enableEditing}
        positionActionsColumn={positionActionsColumn}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            header: "Acciones",
            size: 300,
          },
        }}
        localization={MRT_Localization_ES}
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
        mrtTheme={{ baseBackgroundColor: "#2A3142" }}
      />
    </div>
  );
};
