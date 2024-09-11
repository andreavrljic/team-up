import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type BasicTetxfieldProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType>;
  id: Path<FormType>;
} & TextFieldProps;

const BasicTextfield = <FormType extends FieldValues>({
  label,
  form,
  id,
  disabled,
}: BasicTetxfieldProps<FormType>) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <TextField
      {...register(id)}
      name={id}
      sx={{ minWidth: '15rem' }}
      variant={'filled'}
      label={label}
      error={!!errors[id]}
      helperText={errors[id]?.message?.toString() ?? ''}
      disabled={disabled}
      slotProps={{ inputLabel: { shrink: !!watch(id) } }}
    />
  );
};

export default BasicTextfield;
