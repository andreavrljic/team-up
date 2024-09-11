'use client';
import BasicTextfield from '@/app/components/BasicTexfield';
import TUButton from '@/app/components/TUButton';
import UploadImage from '@/app/components/UploadImage';
import { DeviceContext } from '@/app/context/DeviceTypeContext';
import useUserInfo from '@/app/hooks/useUserInfo';
import { SettingsFormType, TextfieldFormProps } from '@/app/types';
import { updateUserData } from '@/firebase/config';
import { flexColumn, flexRow } from '@/theme/sharedStyle';
import { Avatar, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const settingsFields: Omit<TextfieldFormProps<SettingsFormType>, 'form'>[] = [
  { id: 'email', label: 'E-mail' },
  { id: 'username', label: 'Username' },
  { id: 'age', label: 'Age' },
  { id: 'phoneNumber', label: 'Phone number' },
];

const Settings = () => {
  const settingsForm = useForm<SettingsFormType>();
  const deviceType = useContext(DeviceContext);
  const { user, userProfile } = useUserInfo();
  const [file, setFile] = useState<File | null>(null);

  const { watch } = settingsForm;
  useEffect(() => {
    userProfile && settingsForm.reset(userProfile);
  }, [settingsForm, userProfile]);
  const isGoogleLogged = localStorage.getItem('isGoogleAccount') === 'true';

  const handleImageSelected = (file: File | null) => {
    setFile(file);
  };
  return (
    <Box sx={{ ...flexColumn, padding: '0.5rem', gap: '1rem' }}>
      <Avatar
        sx={{ width: 200, height: 200, alignSelf: 'center' }}
        alt={watch('username')}
        src={user?.photoURL ?? ''}
      />
      {settingsFields.map((field) => {
        return (
          <BasicTextfield
            key={field.id}
            form={settingsForm}
            id={field.id}
            label={field.label}
            disabled={isGoogleLogged && field.id === 'email'}
          />
        );
      })}
      <UploadImage
        onImageSelected={handleImageSelected}
        photoURLPath={watch('photoURL')}
      />
      <Box
        sx={{
          ...(deviceType === 'mobile' ? flexColumn : flexRow),
          justifyContent: 'flex-end',
        }}
      >
        <TUButton
          color='warning'
          variant='contained'
          label={'Save'}
          onClick={() => updateUserData(user!, settingsForm.getValues(), file)}
        />
      </Box>
    </Box>
  );
};

export default Settings;
