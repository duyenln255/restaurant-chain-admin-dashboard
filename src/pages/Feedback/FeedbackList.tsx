import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar';
import FeedbackTable from './FeedbackTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchFeedbacks } from '../../redux/slices/feedbackSlice';
import type { RootState } from '../../redux/store';

import type { FeedbackItem } from '../../types/FeedbackItem';

const FeedbackList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawFeedbacks, loading, error } = useAppSelector((state: RootState) => state.feedbacks);

  const feedbacks = useMemo<FeedbackItem[]>(
    () =>
      rawFeedbacks.map((f) => ({
        id: f.id,
        type: f.type,
        fullName: f.full_name,
        email: f.email,
        phoneNumber: f.phone,
        responsible: {
          branchResponsible: f.branch_id,
          employeeResponsible: f.solved_by ?? undefined,
        },
        feedback: f.content,
        createAt: new Date(f.date_added).toLocaleString(),
        updateAt: f.updated_at ? new Date(f.updated_at).toLocaleString() : undefined,
        status: f.status,
      })),
    [rawFeedbacks]
  );

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="dashboard-body p-6">
          <div className="mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Feedback Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">Add New Feedback</button>
            </div>

            <FilterBar />

            {loading && <p>Loading feedbacks...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && feedbacks.length === 0 && <p>No feedback found.</p>}

            <FeedbackTable items={feedbacks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
