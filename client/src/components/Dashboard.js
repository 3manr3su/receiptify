import React from 'react';
import { Link } from 'react-router-dom';
import ReceiptList from "./Receipts/ReceiptList"

const Dashboard = () => {
  return (
    <div>
       <ReceiptList />
      <h5 className="center">Click on the "Plus" Sign to Add a New Receipt!</h5>
      <div className="fixed-action-btn">
        <Link to="/receipts/new" className="btn-floating btn-large red">
          <i className="material-icons blue">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;