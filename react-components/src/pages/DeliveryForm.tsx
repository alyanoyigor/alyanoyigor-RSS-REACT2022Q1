import React, { ChangeEvent, RefObject } from 'react';
import { FormLocation } from '../components/DeliveryForm/FormLocation';
import { FormPersonalInfo } from '../components/DeliveryForm/FormPersonalInfo';

export class DeliveryForm extends React.Component {
  inputName: RefObject<HTMLInputElement>;
  inputNumber: RefObject<HTMLInputElement>;

  constructor(props: Record<string, unknown>) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputName = React.createRef();
    this.inputNumber = React.createRef();
  }

  handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Delivery Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormPersonalInfo />
            <FormLocation />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
