import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectFeedback = state => state.feedback;

const selectSaveFeedbackData = createSelector(
  selectFeedback,
  state => get('saveFeedback.data', state),
);

const selectSaveFeedbackState = createSelector(
  selectFeedback,
  state => get('saveFeedback.state', state),
);

export { selectSaveFeedbackData, selectSaveFeedbackState };
