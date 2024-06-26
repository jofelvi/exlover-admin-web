import { memo, useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import moment, { Moment } from "moment";
import {
  CustomDatePicker,
  CustomTimePicker,
  FormContainer,
  StyledButton,
  StyledSelect,
} from "../../SharedComponents/styleComponents/sharedForm";
import UseInputTextField from "../../SharedComponents/CustomTextField/useInputTextField";
import {
  NotificationsRequestDto,
  useAddNotifications,
  useUpdateNotifications,
} from "../services/NotificationsServices";
import { AppOptionTarget } from "../../../helpers/Enums";
import { toast } from "react-toastify";
import { closeModal } from "../../../store/modal/modalSlice.ts";
import { useAppDispatch } from "../../../store/HooksRedux.ts";

export interface NotificationFormDto {
  notification: string;
  dayNotification: Moment | null;
  hourNotification: Moment | null;
  target: string;
}

const NotificationSchemaYup = yup.object().shape({
  notification: yup.string().required("El texto es obligatorio"),
  dayNotification: yup.mixed().nullable().required("La fecha es obligatoria"),
  hourNotification: yup.mixed().nullable().required("La hora es obligatoria"),
  target: yup.string().required("El target es obligatorio"),
});

interface CustomFormProps {
  notification?: NotificationFormDto;
  isViewMode?: boolean;
  id?: string | number | null;
}

const NotificationForm = ({
  notification,
  isViewMode = false,
  id,
}: CustomFormProps) => {
  const [typeNotification, setTypeNotification] = useState<string>("");
  const { mutateAsync: addNotifications, isSuccess } = useAddNotifications();
  const { mutateAsync: updateNotifications, isSuccess: isSuccessUpdate } =
    useUpdateNotifications();
  const dispatch = useAppDispatch();

  const methodsForm = useForm<NotificationFormDto>({
    resolver: yupResolver(NotificationSchemaYup) as any,
    defaultValues: {
      notification: "",
      dayNotification: null,
      hourNotification: null,
      target: "",
    },
  });

  useEffect(() => {
    if (notification) {
      methodsForm.reset({
        notification: notification.notification,
        dayNotification: notification.dayNotification
          ? moment(notification.dayNotification)
          : null,
        hourNotification: notification.hourNotification
          ? moment(notification.hourNotification)
          : null,
        target: notification.target,
      });
    }
  }, [notification, methodsForm]);

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      toast.success("Notificacion creada/actualizada con éxito");
      setTimeout(() => {
        dispatch(closeModal());
      }, 300);
    }
  }, [isSuccess, isSuccessUpdate]);

  const onSubmit: SubmitHandler<NotificationFormDto> = async (data) => {
    console.log("onSubmit", data);
    const dataUpdate: NotificationsRequestDto = {
      notification: data.notification,
      dayNotification: data.dayNotification,
      target: data.target,
      isActive: true,
      deleted: false,
      typeNotification: typeNotification,
      hourNotification: data.hourNotification
        ? moment(data.hourNotification).format("HH:mm:ss")
        : null,
    };
    notification
      ? await updateNotifications({ ...dataUpdate, id } as any)
      : await addNotifications(dataUpdate);
  };

  const handleSubmit = async (type: string) => {
    setTypeNotification(type);
    methodsForm.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methodsForm}>
      <form>
        <FormContainer>
          <Typography variant="h6" gutterBottom>
            {id ? "Editar notificación" : "Nueva notificación"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UseInputTextField
                fullWidth
                name="notification"
                label="Texto"
                variant="outlined"
                disabled={isViewMode}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="dayNotification"
                control={methodsForm.control}
                render={({ field, fieldState }) => (
                  <CustomDatePicker
                    label="Fecha"
                    {...field}
                    disabled={isViewMode}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="hourNotification"
                control={methodsForm.control}
                render={({ field, fieldState }) => (
                  <CustomTimePicker
                    label="Hora"
                    {...field}
                    disabled={isViewMode}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="target"
                control={methodsForm.control}
                render={({ field, fieldState }) => (
                  <StyledSelect
                    {...field}
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    error={!!fieldState.error}
                    disabled={isViewMode}
                  >
                    <MenuItem value="" disabled>
                      Selecciona
                    </MenuItem>
                    {Object.entries(AppOptionTarget).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                )}
              />
            </Grid>
            {!isViewMode && (
              <Grid item xs={3} style={{ marginTop: 10 }}>
                <StyledButton
                  fullWidth
                  variant="contained"
                  onClick={() => handleSubmit("Programar")}
                >
                  Programar
                </StyledButton>
              </Grid>
            )}
          </Grid>
          {!isViewMode && (
            <Box mt={2}>
              <StyledButton
                variant="contained"
                onClick={() => handleSubmit("Enviar Ahora")}
              >
                Enviar Ahora
              </StyledButton>
            </Box>
          )}
        </FormContainer>
      </form>
    </FormProvider>
  );
};

export default memo(NotificationForm);
