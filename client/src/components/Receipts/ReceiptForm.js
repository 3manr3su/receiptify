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
    <li className="row">
      <button
        type="button"
        className="btn col s5 light-blue left"
        onClick={() => fields.push({})}
      >
        Add
        <i className="material-icons left"> add </i>
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    
    {fields.map((item, index) => (
      <li className="row"  key={index}>
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
          className="btn left col s5 light-blue"
          onClick={() => fields.remove(index)}
        >
          Del
          <i className="material-icons left col s5 "> clear </i>
        </button>
        
        <button
        type="button"
        className="btn right col s5 light-blue"
        onClick={() => fields.push({})}
      >
        Add
        <i className="material-icons right "> add </i>
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

      <div className="row">
        <button
          type="submit"
          disabled={submitting}
          className="btn right col s5 light-blue"
        >
          Next
          <i className="material-icons right"> arrow_forward </i>
        </button>
        <button
          type="button"
          className="btn left col s5 red"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear
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

  if (!values.items || !values.items.length) {
    errors.items = { _error: 'Must enter at least one item' }
  } else {
    const itemsArrayErrors = []
    values.items.forEach((item, itemIndex) => {
      const itemErrors = {}
      if (!item || !item.name) {
        itemErrors.name= 'Must provide item name and price'
        itemsArrayErrors[itemIndex] = itemErrors
      }
      if (!item|| !item.price) {
        itemErrors.name= 'Must provide item name and price'
        itemsArrayErrors[itemIndex] = itemErrors
      }
    });
    if (itemsArrayErrors.length) {
      errors.items = itemsArrayErrors
    }
  }
  return errors;
  }





export default reduxForm({
  validate, 
  form: "receiptForm", // a unique identifier for this form
  destroyOnUnmount: false
})(ReceiptForm);
