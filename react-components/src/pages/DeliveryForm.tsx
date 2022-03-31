import React, { ChangeEvent, RefObject } from 'react';
import { FormCheckbox } from '../components/DeliveryForm/FormCheckbox';
import { FormLocation } from '../components/DeliveryForm/FormLocation';
import { FormPersonalInfo } from '../components/DeliveryForm/FormPersonalInfo';

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
        <div>
          <form onSubmit={this.handleSubmit} ref={this.form}>
            <FormPersonalInfo />
            <FormLocation />
            <FormCheckbox labelValue="I agree to privacy policy" required={true} />
            <FormCheckbox labelValue="I wish to be notified of promotions" required={false} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
