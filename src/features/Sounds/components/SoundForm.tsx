import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, MenuItem, Typography } from "@mui/material";
import moment, { Moment } from "moment";
import useFileInput from "../../Meditations/hooks/useFileInput.tsx";
import { SoundsCreateDto, useAddSounds } from "../services/SoundsServices.ts";
import FileInputField from "../../SharedComponents/FileInputField/FileInputField.tsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CustomDatePicker,
  FormContainer,
  StyledButton,
  StyledSelect,
} from "../../SharedComponents/styleComponents/sharedForm.tsx";
import UseInputTextField from "../../SharedComponents/CustomTextField/useInputTextField.tsx";
import { AppOptionTarget } from "../../../helpers/Enums.ts";

export interface SoundFormDto {
  name: string;
  album: string;
  dayPublication: Moment | null;
  hourPublication: Moment | null;
  target: string;
}

const SoundSchemaYup = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  album: yup.string().required("El álbum es obligatorio"),
  dayPublication: yup.mixed().required("La fecha es obligatoria"),
  hourPublication: yup.mixed().required("La hora es obligatoria"),
  target: yup.string().required("El target es obligatorio"),
});

interface CustomFormProps {
  sound?: SoundFormDto;
  isViewMode?: boolean;
  id?: string | number | null;
}

const SoundForm = ({ sound, isViewMode = false, id }: CustomFormProps) => {
  const [thumbnail, handleThumbnailChange] = useFileInput();
  const [categoryImage, handleCategoryImageChange] = useFileInput();
  const [fileSleepMusic, handleSleepMusicChange] = useFileInput();
  const { mutateAsync: addSounds, isSuccess } = useAddSounds();
  const [typeNotification, setTypeNotification] = useState<string>("");

  const methods = useForm<SoundFormDto>({
    resolver: yupResolver(SoundSchemaYup) as any,
    defaultValues: {
      album: "",
      name: "",
      target: "",
      dayPublication: null,
      hourPublication: null,
    },
  });

  useEffect(() => {
    console.log({ sound });
    if (sound) {
      methods.reset({
        name: sound?.name,
        dayPublication: sound?.dayPublication
          ? moment(sound.dayPublication)
          : null,
        hourPublication: sound?.hourPublication
          ? moment(sound.hourPublication)
          : null,
        target: sound?.target,
        album: sound?.album,
      });
    }
  }, [sound, methods]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sound creado con éxito");
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<SoundFormDto> = async (data) => {
    const dataUpdate: SoundsCreateDto = {
      name: data.name,
      album: data.album,
      isActive: true,
      iconoCategoria: thumbnail ? thumbnail.name : null,
      imagenCategoria: categoryImage ? categoryImage.name : null,
      archivoAudio: fileSleepMusic ? fileSleepMusic.name : null,
      dayPublication: data.dayPublication || null,
      fileIconoCategoria: thumbnail.content,
      fileImagenCategoria: categoryImage.content,
      fileArchivoAudio: fileSleepMusic.content,
      hourPublication: data.hourPublication
        ? moment(data.hourPublication).format("HH:mm:ss")
        : null,
      target: data.target,
      typePublication: typeNotification,
    };
    console.log(dataUpdate);
    await addSounds(dataUpdate);
  };

  const handleSubmit = async (type: string) => {
    setTypeNotification(type);
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <Typography variant="h6" gutterBottom>
          {id ? "Editar Sound" : "Nueva Sound"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <UseInputTextField
              variant="outlined"
              disabled={isViewMode}
              label="Nombre"
              {...methods.register("name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UseInputTextField
              variant="outlined"
              disabled={isViewMode}
              label="Album"
              {...methods.register("album")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="target"
              control={methods.control}
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="dayPublication"
              control={methods.control}
              render={({ field, fieldState }) => (
                <CustomDatePicker
                  label="Fecha"
                  disabled={isViewMode}
                  {...field}
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="hourPublication"
              control={methods.control}
              render={({ field, fieldState }) => (
                <CustomDatePicker
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
          <Grid item xs={12} sm={6}>
            <FileInputField
              label="Imagen miniatura"
              file={thumbnail.name}
              onChange={handleThumbnailChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInputField
              label="Imagen categoría"
              file={categoryImage.name}
              onChange={handleCategoryImageChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInputField
              label="Archivo música meditación"
              file={fileSleepMusic.name}
              onChange={handleSleepMusicChange}
            />
          </Grid>
          {!isViewMode && (
            <>
              <Grid item xs={12} sm={6} style={{ marginTop: 10 }}>
                <StyledButton
                  fullWidth
                  variant="contained"
                  onClick={() => handleSubmit("Programar")}
                >
                  Programar
                </StyledButton>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: 10 }}>
                <StyledButton
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubmit("Enviar Ahora")}
                >
                  Enviar Ahora
                </StyledButton>
              </Grid>
            </>
          )}
        </Grid>
      </FormContainer>
    </FormProvider>
  );
};

export default SoundForm;
