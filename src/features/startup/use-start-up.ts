import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarAction } from '../calendar/calendar-slice';
import { getLanguage } from './start-up-slice';
import { changeLanguage } from '../../common/utils';
import SplashScreen from 'react-native-splash-screen';

const useStartUp = () => {
  const isMounted = useRef(false);
  const currentLanguage = useSelector(getLanguage).find(
    item => item.isSelected === true,
  );
  const dispatch = useDispatch();
  const [isReadyRenderUI, setReadyRenderUI] = useState(false);
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
    changeLanguage(currentLanguage.code);
    isMounted.current = true;
    setReadyRenderUI(true);
    SplashScreen.hide();
  }, [currentLanguage.code, generateDates]);
  return { isReadyRenderUI };
};

export default useStartUp;
