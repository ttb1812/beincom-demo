import moment from 'moment';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CalendarAction } from '../calendar/calendar-slice';

const useStartUp = () => {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const generateDates = useCallback(() => {
    const today = moment();
    const daysArray = Array.from({ length: 15 }, (_, index) =>
      today
        .clone()
        .add(index - 7, 'days')
        .format('YYYY-MM-DD'),
    );
    dispatch(CalendarAction.setCalendarCarousel({ dates: daysArray }));
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    generateDates();
    isMounted.current = true;
  }, [generateDates]);
  return {};
};

export default useStartUp;
