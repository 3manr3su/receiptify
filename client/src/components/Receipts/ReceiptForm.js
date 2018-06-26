import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} style ={{ marginBottom: '5px' }}/>
        <div style={{ marginBottom: '20px' }}>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
  </div>
);

const renderItems = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button
        type="button"
        className="btn light-blue"
        onClick={() => fields.push({})}
      >
        Add Line Item
        <i className="material-icons left"> add </i>
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) => (
      <li key={index}>
        <h5>Item {index + 1}</h5>
        <Field
          name={`${item}.name`}
          type="text"
          component={renderField}
          label="Item Name"
        />
        <Field
          name={`${item}.price`}
          type="text"
          component={renderField}
          label="Item Price (e.g., $20.00)"
        />
        <button
          type="button"
          title="Remove Item"
          className="btn light-blue"
          onClick={() => fields.remove(index)}
        >
          Remove Item
          <i className="material-icons left"> clear </i>
        </button>
      </li>
    ))}
  </ul>
);

const ReceiptForm = props => {
  const { handleSubmit, pristine, reset, submitting, onReceiptSubmit} = props;
  return (
    <form onSubmit={handleSubmit(onReceiptSubmit)}>
      <Field
        name="vendorName"
        type="text"
        component={renderField}
        label="Vendor Name"
      />
      <Field
        name="date"
        type="text"
        component={renderField}
        label="Date of Purchase (mm/dd/yyyy)"
      />
      <Field
        name="description"
        type="text"
        component={renderField}
        label="Description of Purchase"
      />

      <FieldArray name="items" component={renderItems} />

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="btn right light-blue"
        >
          Next
          <i className="material-icons right"> arrow_forward </i>
        </button>
        <button
          type="button"
          className="btn red"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Form
          <i className="material-icons left"> clear_all </i>
        </button>
      </div>
    </form>
  );
};
function validate(values) {
    const errors = {};
    if (!values.vendorName) {
      errors.vendorName = "You must provide a vendor name";
    }
    if (!values.date) {
      errors.date = "You must provide a date";
    }
    if (!values.itemName) {
      errors.itemName = "You must provide an item name";
    }
    if (!values.itemPrice) {
      errors.itemPrice = "You must provide a value";
    }
    if (!values.items) {
      errors.items = { _error: 'At least one member must be entered' };
    }
  
    return errors;
  }




export default reduxForm({
  validate, 
  form: "receiptForm", // a unique identifier for this form
  destroyOnUnmount: false
})(ReceiptForm);
