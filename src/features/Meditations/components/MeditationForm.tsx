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
import FileInputField from "../../SharedComponents/FileInputField/FileInputField.tsx";
import useFileInput from "../hooks/useFileInput.tsx";
import {
  MeditationCreateAudioDto,
  useAddMeditation,
  useGetAllCategoriesMeditations,
  useUpdateMeditation,
} from "../services/MeditacionsServices.ts";
import {
  CustomDatePicker,
  CustomTimePicker,
  FormContainer,
  StyledButton,
  StyledSelect,
} from "../../SharedComponents/styleComponents/sharedForm.tsx";
import UseInputTextField from "../../SharedComponents/CustomTextField/useInputTextField.tsx";
import { useEffect, useState } from "react";
import { AppOptionTarget } from "../../../helpers/Enums.ts";
import { toast } from "react-toastify";
import { closeModal } from "../../../store/modal/modalSlice.ts";
import { useAppDispatch } from "../../../store/HooksRedux.ts";

export interface MeditationAudioFormValues {
  name: string;
  category: {
    id: string;
    name: string;
  };
  target: string;
  dayPublication: Moment | null;
  hourPublication: Moment | null;
}

const MeditationAudioFormSchema = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  category: yup
    .object({
      id: yup.string().required("Categoría es requerida"),
      name: yup.string().required("Nombre de la categoría es requerido"),
    })
    .required("Categoría es requerida"),
  target: yup.string().required("Target es requerido"),
  dayPublication: yup.mixed().required("La fecha es obligatoria"),
  hourPublication: yup.mixed().required("La hora es obligatoria"),
});

interface CustomFormProps {
  meditacion?: MeditationAudioFormValues;
  isViewMode?: boolean;
  id?: string | number | null;
}

const MeditationAudioForm = ({
  meditacion,
  isViewMode = false,
  id,
}: CustomFormProps) => {
  const methods = useForm<MeditationAudioFormValues>({
    resolver: yupResolver(MeditationAudioFormSchema) as any,
    defaultValues: {
      name: "",
      category: { id: "", name: "" },
      target: "",
      dayPublication: null,
      hourPublication: null,
    },
  });
  const { mutateAsync: addMeditation, isSuccess } = useAddMeditation();
  const { mutateAsync: updateMeditation, isSuccess: isSuccessUpdate } =
    useUpdateMeditation();
  const { data } = useGetAllCategoriesMeditations();
  const [thumbnail, handleThumbnailChange] = useFileInput();
  const [categoryImage, handleCategoryImageChange] = useFileInput();
  const [meditationVoice, handleMeditationVoiceChange] = useFileInput();
  const [meditationMusic, handleMeditationMusicChange] = useFileInput();
  const [typeNotification, setTypeNotification] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (meditacion) {
      methods.reset({
        name: meditacion.name,
        dayPublication: meditacion.dayPublication
          ? moment(meditacion.dayPublication)
          : null,
        hourPublication: meditacion.hourPublication
          ? moment(meditacion.hourPublication)
          : null,
        target: meditacion.target,
        category: {
          id: meditacion.category.id.toString(),
          name: meditacion.category.name,
        },
      });
    }
  }, [meditacion, methods]);

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      toast.success("Meditacion creada/actualizada con éxito");
      setTimeout(() => {
        dispatch(closeModal());
      }, 300);
    }
  }, [isSuccess, isSuccessUpdate]);

  const onSubmit: SubmitHandler<MeditationAudioFormValues> = async (data) => {
    console.log("data value", data);
    const dataUpdate: MeditationCreateAudioDto = {
      name: data.name,
      categoryName: data.category.name,
      categoryId: parseInt(data.category.id),
      selectcategory: data.category.name,
      description: null,
      fileIconoCategoria: thumbnail.content,
      iconoCategoria: thumbnail ? thumbnail.name : null,
      fileImagenCategoria: categoryImage.content,
      imagenCategoria: categoryImage ? categoryImage.name : null,
      fileArchivoVoz: meditationVoice.content,
      archivoVoz: meditationVoice ? meditationVoice.name : null,
      fileArchivoMusica: meditationMusic.content,
      archivoMusica: meditationMusic ? meditationMusic.name : null,
      dayPublication: data.dayPublication || null,
      hourPublication: data.hourPublication
        ? moment(data.hourPublication).format("HH:mm:ss")
        : undefined,
      target: data.target,
      countReproduced: null,
      isActive: true,
      typePublication: typeNotification,
    };

    console.log(dataUpdate);
    meditacion && id
      ? await updateMeditation({ ...dataUpdate, id } as any)
      : await addMeditation(dataUpdate);
  };

  const handleSubmit = async (type: string) => {
    setTypeNotification(type);
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <Typography variant="h6" gutterBottom>
          {id ? "Editar Meditacion" : "Nueva Meditacion"}
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
            <Controller
              name="category"
              control={methods.control}
              render={({ field, fieldState }) => (
                <StyledSelect
                  {...field}
                  fullWidth
                  displayEmpty
                  variant="outlined"
                  error={!!fieldState.error}
                  disabled={isViewMode}
                  value={field.value?.id || ""}
                  onChange={(e) => {
                    const selectedCategory = data?.find(
                      (cat) => cat.id.toString() === e.target.value,
                    );
                    field.onChange(
                      selectedCategory
                        ? {
                            id: selectedCategory.id.toString(),
                            name: selectedCategory.name,
                          }
                        : { id: "", name: "" },
                    );
                  }}
                >
                  <MenuItem value="" disabled>
                    Selecciona
                  </MenuItem>
                  {data?.map((category) => (
                    <MenuItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </MenuItem>
                  ))}
                </StyledSelect>
              )}
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
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
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
            <Controller
              name="hourPublication"
              control={methods.control}
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
          <Grid item xs={12} sm={12}>
            <FileInputField
              label="Imagen miniatura"
              file={thumbnail.name}
              onChange={handleThumbnailChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileInputField
              label="Imagen categoría"
              file={categoryImage.name}
              onChange={handleCategoryImageChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileInputField
              label="Archivo voz meditación"
              file={meditationVoice.name}
              onChange={handleMeditationVoiceChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileInputField
              label="Archivo música meditación"
              file={meditationMusic.name}
              onChange={handleMeditationMusicChange}
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

              <Grid xs={12} sm={6} style={{ marginTop: 26, paddingLeft: 15 }}>
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
        {!isViewMode && <Box mt={2}></Box>}
      </FormContainer>
    </FormProvider>
  );
};

export default MeditationAudioForm;
