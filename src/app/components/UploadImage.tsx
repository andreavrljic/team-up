'use client';
import { flexColumn } from '@/theme/sharedStyle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

type UploadImageType = {
  onImageSelected: (imageFile: File | null) => void;
  photoURLPath: string;
};

const UploadImage = ({ onImageSelected, photoURLPath }: UploadImageType) => {
  const [photoURL, setPhotoURL] = useState<string | null>(photoURLPath);

  const handleOnChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photoFile = event.target.files?.item(0);
    if (photoFile) {
      setPhotoURL(photoFile.name);
      onImageSelected(photoFile);
    } else {
      setPhotoURL(null);
    }
  };
  return (
    <Box sx={{ ...flexColumn, gap: '1rem' }}>
      <TextField
        value={photoURL || ''}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        label={'Profile image'}
        placeholder={'No file selected'}
        variant='filled'
        fullWidth
      />
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload image
        <input
          type='file'
          accept='image/*'
          onChange={handleOnChangePhoto}
          style={{ display: 'none' }}
        />
      </Button>
    </Box>
  );
};

export default UploadImage;
