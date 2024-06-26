import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { closeModal } from "../../../store/modal/modalSlice";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "#222736",
  color: "black",
  border: "2px solid grey",
  boxShadow: 24,
};

const ModalCustom = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const content = useSelector((state: RootState) => state.modal.content);
  const tittle = useSelector((state: RootState) => state.modal.tittle);
  //const accions = useSelector((state: RootState) => state.modal.accions)
  const theme = useTheme();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen || false}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            display: "grid",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>
          {tittle}
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        {/*  <DialogActions>{accions}</DialogActions> */}
      </Box>
    </Modal>
  );
};

export default ModalCustom;
