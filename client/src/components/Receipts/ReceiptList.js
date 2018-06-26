import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchReceipts, deleteReceipt } from "../../actions";
import _ from "lodash";

class ReceiptList extends Component {

  
  renderReceipts() {
    return this.props.receipts.reverse().map(receipt => {
      const Items = _.map(receipt.items, (price, name) => {
        return (
          <ul key={name}>
            <li>{name}</li>
            <li>{price}</li>
          </ul>
        );
      });

      return (
        <div className="card light-blue lighten-5" key={receipt._id}>
          <div className="card-content">
            <span className="card-title">{receipt.vendorName}</span>
            <div>Description: {receipt.description}</div>
            <div>Purchased On: {receipt.date}</div>
            <span className="card-content">{Items}</span>
            <button
          type="button"
          title="Remove Receipt"
          className="btn light-blue"
          onClick={()=>this.props.deleteReceipt(receipt._id).then(()=>{ this.props.fetchReceipts()})
           
          }
        >Delete Receipt</button>
          </div>
        </div>
      );
    });
  }

  componentDidMount() {
    this.props.fetchReceipts();
  }

  render() {


    return (
      <div>
        {this.renderReceipts()}
        <div />
      </div>
    );
  }
}

function mapStateToProps({ receipts }) {
  return { receipts };
}

export default connect(
  mapStateToProps,
  { fetchReceipts, deleteReceipt }
)(withRouter(ReceiptList));
