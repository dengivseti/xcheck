import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { RootState } from '../../redux/rootReducer';
import {
  ITaskItem,
  ITaskOrderItems,
  typeGrade,
} from '../../interfaces/interfaces';

import { setInitialValue, setfinalGrade } from '../../redux/slices/GradeSlice';
import { Order } from '../../components/Order';

export interface IGradeProps {
  type: typeGrade;
  items: ITaskItem[];
  grade?: ITaskOrderItems;
}

export const Grade: React.FC<IGradeProps> = ({
  items,
  type = 'SELFGRADE',
  grade = {},
}) => {
  const dispatch = useDispatch();
  const { sortItems, score, totalScore, finalGrade } = useSelector(
    (state: RootState) => {
      return {
        sortItems: state.grade.sortItems,
        score: state.grade.score,
        totalScore: state.grade.totalScore,
        finalGrade: state.grade.finalGrade,
      };
    }
  );

  useEffect(() => {
    dispatch(setInitialValue({ items, grade, type }));
  }, []);

  const solutionHandler = (obj) => {
    dispatch(setfinalGrade(obj));
  };

  const debounceSolutionHandler = useCallback(
    debounce(solutionHandler, 200),
    []
  );

  return (
    <div>
      <br />
      {Object.keys(sortItems).map((item) => (
        <Order
          key={item}
          items={sortItems[item]}
          taskSelfGrade={finalGrade}
          name={item}
          type={type}
          onComment={debounceSolutionHandler}
          onScore={debounceSolutionHandler}
        />
      ))}
      <h2>
        Результат проверки {score}/{totalScore}
      </h2>
    </div>
  );
};
