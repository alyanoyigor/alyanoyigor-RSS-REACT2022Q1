import React, { useState } from 'react';
import { FormCardsList } from '../components/FormComponents/FormCardsList';
import { Form } from '../components/FormComponents/Form';
import { DeliveryCard } from '../types/types';

export const Delivery = () => {
  const [cardsList, setCardsList] = useState<DeliveryCard[]>([]);

  const handleSubmitForm = (card: DeliveryCard) => {
    setCardsList((prevCards) => [card, ...prevCards]);
  };
  return (
    <div>
      <h1>Delivery Form</h1>
      <Form onSubmitForm={handleSubmitForm} />
      <FormCardsList cardsList={cardsList} />
    </div>
  );
};
