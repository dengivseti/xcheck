import React from 'react';
import { FormReview } from '../../containers/FormReview';

export const EditReview: React.FC = () => {
  return (
    <>
      <FormReview isEdit={true} />
    </>
  );
};
