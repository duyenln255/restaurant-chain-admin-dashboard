import React, { useState, useEffect, useMemo } from 'react'
import FilterBar from './FilterBar'
import FeedbackTable from './FeedbackTable'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchFeedbacks } from '../../redux/slices/feedbackSlice'
import type { RootState } from '../../redux/store'
import type { FeedbackItem } from '../../types/FeedbackItem'

const FeedbackList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: rawFeedbacks, loading, error } = useAppSelector(
    (state: RootState) => state.feedbacks
  )

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
          employeeResponsible: f.solved_by ?? undefined
        },
        feedback: f.content,
        createAt: new Date(f.date_added).toLocaleString(),
        updateAt: f.updated_at
          ? new Date(f.updated_at).toLocaleString()
          : undefined,
        status: f.status
      })),
    [rawFeedbacks]
  )

  useEffect(() => {
    dispatch(fetchFeedbacks())
  }, [dispatch])

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">
              Feedback Lists
            </h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 py-2 rounded-md transition">
              Add New Feedback
            </button>
          </div>

          {/* Filter Bar */}
          <FilterBar />

          {/* States */}
          {loading && <p className="text-sm">Loading feedbacks...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && feedbacks.length === 0 && (
            <p className="text-sm text-gray-500">No feedback found.</p>
          )}

          {/* Table */}
          <FeedbackTable items={feedbacks} />
        </div>
      </div>
    </div>
  )
}

export default FeedbackList
