import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const formFields = [
  { label: "Vendor Name", name: "vendorName" },
  { label: "Date of Purchase", name: "date" },
  { label: "Description of Purchase", name: "description" }
];

const ReceiptReview = ({ onCancel, formValues, submitReceipt, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  const listItems = _.map(formValues.items, function(item, index, name, label) {
    return (
      <div key={index}>
        <label>{item.name}</label>
        <div>{item.price}</div>
      </div>
    );
  });

  return (
    <div className="row">
      <h5>Please confirm your entries</h5>
      {reviewFields}
      {listItems}
      <button className="btn col s5 left light-blue" onClick={onCancel}>
        Back
        <i className="material-icons left">arrow_back</i>
      </button>
      <button
        onClick={() => submitReceipt(formValues, history)}
        className="green col s7 btn right "
      >
        Submit Receipt
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.receiptForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(ReceiptReview));
