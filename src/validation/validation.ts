import * as yup from 'yup';
const requiredText = 'This field is required';
const transformField = (curr: string, orig: string) => (orig === '' ? null : curr);

export const formSchema = yup
  .object({
    title: yup
      .string()
      .required(requiredText)
      .min(2, 'This field must have 2 characters minimum')
      .max(30, 'This field must have 30 characters maximum'),
    releaseDate: yup
      .date()
      .nullable()
      .transform(transformField)
      .max(new Date(), 'Release date must be before current date')
      .required(requiredText),
    country: yup.string().required(requiredText),
    privacyCheckbox: yup.boolean().oneOf([true], requiredText),
    city: yup.string().nullable().transform(transformField).required(requiredText),
    poster: yup
      .mixed()
      .test('fileType', 'The file must be jpg, png, svg or gif formats', (value: FileList) => {
        if (value[0]?.type) {
          const acceptExts = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif', 'image/jpg'];
          return acceptExts.some((ext) => ext === value[0].type);
        }
        return true;
      }),
    budget: yup.number().nullable().transform(transformField).required(requiredText),
    audience: yup.string().nullable().required(requiredText),
  })
  .required();
