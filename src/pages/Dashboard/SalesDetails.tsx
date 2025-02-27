import React from 'react';
import './SalesDetails.css';

const SalesDetails: React.FC = () => {
  return (
    <div className="sales-details">
      <div className="sales-details-header">
        <h2>Sales Details</h2>
        <div className="month-selector">
          <span>October</span>
          <img src="/assets/icons/chevron-down.png" alt="Calendar" />
        </div>
      </div>
      <div className="sales-chart">
        <div className="chart-y-axis">
          <div>100%</div>
          <div>80%</div>
          <div>60%</div>
          <div>40%</div>
          <div>20%</div>
        </div>
        <div className="chart-content">
          <img src="/assets/images/sales-graph-bg.png" alt="Sales graph background" className="chart-background" />
          <img src="/assets/images/sales-graph.png" alt="Sales graph" className="chart-line" />
        </div>
      </div>
      <div className="chart-x-axis">
        <div>5k</div>
        <div>10k</div>
        <div>15k</div>
        <div>20k</div>
        <div>25k</div>
        <div>30k</div>
        <div>35k</div>
        <div>40k</div>
        <div>45k</div>
        <div>50k</div>
        <div>55k</div>
        <div>60k</div>
      </div>
    </div>
  );
};

export default SalesDetails;