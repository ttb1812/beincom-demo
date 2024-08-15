import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useSelector } from 'react-redux';
import { PopupManager } from '../../common/components';
import { translate } from '../../common/utils';
import { getCategories } from '../manage-category/manage-category-slice';
import { ITaskItem } from '../manage-category/types';
import { IFilterItem } from '../../common/components/filter-carousel/types';

const useCalendarScreen = () => {
  const isMouted = useRef(false);
  const categories = useSelector(getCategories);

  const FILTER_DATA = [
    { id: '1', title: 'all', key: 'all' },
    { id: '2', title: 'todo', key: 'to_do' },
    { id: '3', title: 'completed', key: 'completed' },
  ];

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [monthSelected, setMonthSelected] = useState<string>(today);
  const [filters] = useState<IFilterItem[]>(FILTER_DATA);
  const [filterOption, setFilterOption] = useState<IFilterItem>(FILTER_DATA[0]);

  const tasks = useMemo(() => {
    let temp: ITaskItem[] = [];
    categories.forEach(category => {
      if (_.isArray(category.tasks)) {
        temp = temp.concat(category.tasks);
      }
    });

    return temp;
  }, [categories]);

  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: translate('featureDevelopmemt'),
      message: '',
      confirmButton: {
        text: translate('ok'),
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
