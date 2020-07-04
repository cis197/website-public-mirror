import React from 'react'
import { FEEDBACK_ROUTE } from '../constants/routes'
import NotFoundPage from './404'

/**
 * Redirect the user to the feedback form is there is one
 */
const FeedbackPage = () => {
  if (!FEEDBACK_ROUTE) {
    return <NotFoundPage />
  }

  if (typeof window !== 'undefined') {
    window.location = FEEDBACK_ROUTE
  }

  return <React.Fragment />
}

export default FeedbackPage
