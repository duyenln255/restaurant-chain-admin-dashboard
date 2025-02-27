import React from 'react';
import { StatCardProps } from '../../types/StatCardProps';
import './StatCard.css';

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeText, icon, bgColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-info">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
        </div>
        <div className={`stat-icon ${bgColor}`}>
          <img src={icon} alt={title} />
        </div>
      </div>
      <div className="stat-change">
        <span className="change-value">{change}</span>
        <span className="change-text">{changeText}</span>
      </div>
    </div>
  );
};

export default StatCard;