import React, { Component } from "react";
import { reduxForm } from "redux-form"
import ReceiptForm from "./ReceiptForm";
import ReceiptReview from "./ReceiptReview";
import { formPropTypes } from "redux-form/lib/propTypes";


class RecieptNew extends Component {
  state = { showReceiptReview: false };

  renderContent() {
    if (this.state.showReceiptReview) {
      return <ReceiptReview onCancel={() => this.setState({ showReceiptReview: false })}/>;
    }
    return (


        <ReceiptForm
        onReceiptSubmit={() => this.setState({showReceiptReview: true})}
        />
    );
  }
  render() {
    
    
    return(
      <div className="container">
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm ({
  form: 'receiptForm'
})(RecieptNew);
