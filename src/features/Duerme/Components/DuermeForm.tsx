import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, MenuItem, Typography } from "@mui/material";
import { Moment } from "moment";
import useFileInput from "../../Meditations/hooks/useFileInput.tsx";
import moment from "moment/moment";
import {
  SleepRequestDto,
  SleepResponseDto,
  useAddSleep,
} from "../services/DuermesServices.ts";
import FileInputField from "../../SharedComponents/FileInputField/FileInputField.tsx";
import { useEffect, useState } from "react";
import {
  CustomDatePicker,
  CustomTimePicker,
  FormContainer,
  StyledButton,
  StyledSelect,
} from "../../SharedComponents/styleComponents/sharedForm.tsx";
import { useGetAllCategoriesMeditations } from "../../Meditations/services/MeditacionsServices.ts";
import { AppOptionTarget } from "../../../helpers/Enums.ts";
import { toast } from "react-toastify";
import UseInputTextField from "../../SharedComponents/CustomTextField/useInputTextField.tsx";

interface DuermeFormDto {
  name: string;
  category: {
    id: string;
    name: string;
  };
  target: string;
  dayPublication: Moment | null;
  hourPublication: Moment | null;
}

const DuermeSchemaYup = yup.object().shape({
  name: yup.string().required("Nombre es requerido"),
  category: yup.string().required("Categoría es requerida"),
  target: yup.string().required("Target es requerido"),
  dayPublication: yup.mixed().required("La fecha es obligatoria"),
  hourPublication: yup.mixed().required("La hora es obligatoria"),
});

interface CustomFormProps {
  duermeItem?: SleepResponseDto;
  isViewMode?: boolean;
  id?: string | number | null;
}

const DuermeForm = ({
  duermeItem,
  isViewMode = false,
  id,
}: CustomFormProps) => {
  const [thumbnail, handleThumbnailChange] = useFileInput();
  const [categoryImage, handleCategoryImageChange] = useFileInput();
  const [fileSleepMusic, handleSleepMusicChange] = useFileInput();
  const { mutateAsync: addSleep, isSuccess } = useAddSleep();
  const [typeNotification, setTypeNotification] = useState<string>("");
  const { data } = useGetAllCategoriesMeditations();

  const methods = useForm<DuermeFormDto>({
    resolver: yupResolver(DuermeSchemaYup) as any,
    defaultValues: {
      category: {},
      name: "",
      target: "",
      dayPublication: null,
      hourPublication: null,
    },
  });

  useEffect(() => {
    if (duermeItem) {
      methods.reset({
        name: duermeItem.name,
        dayPublication: duermeItem.dayPublication
          ? moment(duermeItem.dayPublication)
          : null,
        hourPublication: duermeItem.hourPublication
          ? moment(duermeItem.hourPublication)
          : null,
        target: duermeItem.target,
        category: {
          id: duermeItem.categoryName,
          name: duermeItem.categoryName,
        },
      });
    }
  }, [duermeItem, methods]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Duerme creado con éxito");
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<DuermeFormDto> = async (data) => {
    const dataUpdate: SleepRequestDto = {
      name: data.name,
      categoryName: data.category.name,
      iconoCategoria: thumbnail ? thumbnail.name : null,
      imagenCategoria: categoryImage ? categoryImage.name : null,
      archivoDuerme: fileSleepMusic ? fileSleepMusic.name : null,
      dayPublication: data.dayPublication || null,
      fileIconoCategoria: thumbnail.content,
      fileImagenCategoria: categoryImage.content,
      fileArchivoDuerme: fileSleepMusic.content,
      hourPublication: data.hourPublication
        ? moment(data.hourPublication).format("HH:mm:ss")
        : null,
      target: data.target,
      typePublication: typeNotification,
    };
    console.log(dataUpdate);
    await addSleep(dataUpdate);
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
              label="Nombre"
              variant="outlined"
              disabled={isViewMode}
              {...methods.register("name")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={methods.control}
              render={({ field, fieldState }) => (
                <StyledSelect
                  {...field}
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
                        : null,
                    );
                  }}
                  fullWidth
                  displayEmpty
                  variant="outlined"
                  error={!!fieldState.error}
                  disabled={isViewMode}
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
              render={({ field }) => (
                <CustomDatePicker
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
                <CustomTimePicker
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

export default DuermeForm;
