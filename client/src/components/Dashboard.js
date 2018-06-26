import React from 'react';
import { Link } from 'react-router-dom';
import ReceiptList from "./Receipts/ReceiptList"

const Dashboard = () => {
  return (
    <div className="container">
       <ReceiptList />
      <h5 className="center">click on the + to add a receipt</h5>
      <div className="fixed-action-btn">
        <Link to="/receipts/new" className="btn-floating btn-large">
          <i className="material-icons blue">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;