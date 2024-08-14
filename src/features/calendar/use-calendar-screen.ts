import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { IFilterItem } from '../../common/components/filter-carousel/filter-carousel';
import { PopupManager } from '../../common/components';

const useCalendarScreen = () => {
  const isMouted = useRef(false);
  const FILTER_DATA = [
    { id: '1', title: 'All', key: 'all' },
    { id: '2', title: 'To do', key: 'toDo' },
    { id: '3', title: 'Completed', key: 'completed' },
  ];

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [monthSelected, setMonthSelected] = useState<string>(today);
  const [tasks] = useState(new Array(40));
  const [filters] = useState<IFilterItem[]>(FILTER_DATA);
  const [filterOption, setFilterOption] = useState<IFilterItem>(FILTER_DATA[0]);
  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: 'Feature development!',
      message: '',
      confirmButton: {
        text: 'Ok',
      },
    });
  }, []);

  useEffect(() => {
    if (isMouted.current) {
      return;
    }
    DeviceEventEmitter.emit('scrollToDayIndex');
    isMouted.current = true;
  }, []);
  const handleFilterOption = useCallback((option: IFilterItem) => {
    setFilterOption(option);
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    monthSelected,
    setMonthSelected,
    tasks,
    filterOption,
    handleFilterOption,
    filters,
    featureDevelop,
  };
};

export default useCalendarScreen;
