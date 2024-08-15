import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { IFilterItem } from '../../common/components/filter-carousel/filter-carousel';
import { PopupManager } from '../../common/components';
import { useSelector } from 'react-redux';
import { getCategories } from '../manage-category/manage-category-slice';
import _ from 'lodash';
import { ITaskItem } from '../manage-category/types';

const useCalendarScreen = () => {
  const isMouted = useRef(false);
  const categories = useSelector(getCategories);
  const tasks = useMemo(() => {
    let temp: ITaskItem[] = [];
    categories.forEach(category => {
      if (_.isArray(category.tasks)) {
        temp = temp.concat(category.tasks);
      }
    });
    return temp || [];
  }, [categories]);

  const FILTER_DATA = [
    { id: '1', title: 'All', key: 'all' },
    { id: '2', title: 'To do', key: 'toDo' },
    { id: '3', title: 'Completed', key: 'completed' },
  ];

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [monthSelected, setMonthSelected] = useState<string>(today);
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
