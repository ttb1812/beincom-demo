import { createAction, createReducer } from '@reduxjs/toolkit';

interface IInitialStateProps {
  calendarCarousel: string[];
}

const initialState: IInitialStateProps = {
  calendarCarousel: [],
};

export const calendarReducerName = 'calendar';

export class CalendarAction {
  static setCalendarCarousel = createAction<{ dates: string[] }>(
    calendarReducerName + '/setCalendarCarousel',
  );
}

export const calendarReducer = createReducer(initialState, builder => {
  builder.addCase(CalendarAction.setCalendarCarousel, (state, { payload }) => {
    return { ...state, calendarCarousel: payload.dates };
  });
});

export const getCalendarCarousel = (state: {
  [calendarReducerName]: IInitialStateProps;
}) => state[calendarReducerName].calendarCarousel;
