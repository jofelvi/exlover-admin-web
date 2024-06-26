import * as yup from 'yup';

export const NotificationsSchemaYup = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  title: yup.string().required('El título es requerido'),
  subTitle: yup.string().optional(),
  target: yup.array().of(yup.string()).optional(),
  type: yup.string().required('El tipo es requerido'),
  description: yup.string().required('La descripción es requerida'),
  discountAmount: yup.number().optional(),
  isUniqueProduct: yup.boolean().required('Es necesario indicar si es un producto único'),
  isPromotionSpecial: yup.boolean().required('Es necesario indicar si es una promoción especial'),
  awardChoiceId: yup.string().required('El ID de elección de premio es requerido'),
});