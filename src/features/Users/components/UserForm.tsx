import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Moment } from "moment";
import useFileInput from "../../Meditations/hooks/useFileInput.tsx";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import FileInputField from "../../SharedComponents/FileInputField/FileInputField.tsx";

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
  dayPublication: yup.mixed().nullable().required("La fecha es obligatoria"),
  hourPublication: yup.mixed().nullable().required("La hora es obligatoria"),
  target: yup.string().required("El target es obligatorio"),
});

const UserForm = () => {
  const [thumbnail, handleThumbnailChange] = useFileInput();
  const [categoryImage, handleCategoryImageChange] = useFileInput();
  const [fileSleepMusic, handleSleepMusicChange] = useFileInput();

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

  const onSubmit: SubmitHandler<SoundFormDto> = async () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre" {...methods.register("name")} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Album" {...methods.register("album")} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="target"
              control={methods.control}
              render={({ field }) => (
                <Select {...field} label="Target" disabled={false} fullWidth>
                  <MenuItem value="option1">Opción 1</MenuItem>
                  <MenuItem value="option2">Opción 2</MenuItem>
                  <MenuItem value="option3">Opción 3</MenuItem>
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dayPublication"
              control={methods.control}
              render={({ field }) => (
                <DatePicker
                  label="Fecha"
                  disabled={false}
                  {...field}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="hourPublication"
              control={methods.control}
              render={({ field }) => (
                <TimePicker
                  label="Hora"
                  disabled={false}
                  {...field}
                  slotProps={{ textField: { fullWidth: true } }}
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
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" color="primary">
              Publicar Ahora
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default UserForm;
