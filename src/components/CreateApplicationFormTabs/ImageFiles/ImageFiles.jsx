import React, { lazy, Suspense } from 'react';

const FileInput = lazy(() => import('../../FileInput/FileInput'))

const ImageFiles = ({
  state,
  handleImageChange,
  removeImage,
}) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <FileInput
          name='passport1'
          file={state?.passport1}
          label='Лицевая сторона паспорта'
          handleImageChange={handleImageChange}
          removeImage={removeImage}
        />
        <FileInput
          name='passport2'
          file={state?.passport2}
          label='Обратная сторона паспорта'
          handleImageChange={handleImageChange}
          removeImage={removeImage}
        />
        <FileInput
          name='locationScreenShot'
          file={state?.locationScreenShot}
          label='Скриншот локации'
          handleImageChange={handleImageChange}
          removeImage={removeImage}
        />
      </Suspense>
    </>
  );
};

export default ImageFiles;