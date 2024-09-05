import { TextField, TextFieldProps } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type BasicTetxfieldProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType>;
  id: Path<FormType>;
} & TextFieldProps;

const BasicTextfield = <FormType extends FieldValues>({
  label,
  form,
  id,
}: BasicTetxfieldProps<FormType>) => {
  const {
    register,
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
    />
  );
};

export default BasicTextfield;
