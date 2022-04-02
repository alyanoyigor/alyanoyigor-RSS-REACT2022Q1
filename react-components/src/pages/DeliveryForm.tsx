import React, { ChangeEvent, RefObject } from 'react';
import styled from 'styled-components';
import { FormCheckbox } from '../components/DeliveryForm/FormCheckbox';
import { FormLocation } from '../components/DeliveryForm/FormLocation';
import { FormPersonalInfo } from '../components/DeliveryForm/FormPersonalInfo';
import { FormPromotions } from '../components/DeliveryForm/FormPromotions';
import { SubmitBtn } from '../components/DeliveryForm/SubmitBtn';

const Form = styled.form`
  padding: 2rem;
  background-color: rgb(112, 204, 231);
  border-radius: 1rem;
`;

export class DeliveryForm extends React.Component {
  form: RefObject<HTMLFormElement>;

  constructor(props: Record<string, unknown>) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
  }

  handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(this.form.current);
    console.log(this.form.current?.nameInput.value);
    console.log(this.form.current?.gender.value);
  }

  render() {
    return (
      <div>
        <h1>Delivery Form</h1>
        <Form onSubmit={this.handleSubmit} ref={this.form}>
          <FormPersonalInfo />
          <FormLocation />
          <FormPromotions />
          <SubmitBtn>Submit</SubmitBtn>
        </Form>
      </div>
    );
  }
}
