import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGradeItems, ITaskOrderItems } from '../../interfaces/interfaces';
import { AppThunk } from '../store';

interface IGradeState {
  score: number;
  totalScore: number;
  sortItems: IGradeItems;
  finalGrade: ITaskOrderItems;
}

interface solutionItem {
  id: string;
  score?: number;
  comment?: string;
}

const initialState: IGradeState = {
  score: 0,
  totalScore: 0,
  sortItems: {},
  finalGrade: {},
};

const grade = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    setClear(state) {
      state.score = 0;
      state.totalScore = 0;
      state.sortItems = {};
      state.finalGrade = {};
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setValues(state, action: PayloadAction<IGradeState>) {
      const { sortItems, totalScore, score, finalGrade } = action.payload;
      state.score = score;
      state.sortItems = sortItems;
      state.totalScore = totalScore;
      state.finalGrade = finalGrade;
    },
    setfinalGrade(state, action: PayloadAction<solutionItem>) {
      const solution = action.payload;
      const key = Object.keys(solution).filter((s) => s !== 'id')[0];
      if (key === 'comment') {
        state.finalGrade[solution.id].comment = solution.comment;
      } else if (key === 'score' && typeof solution[key] === 'number') {
        state.finalGrade[solution.id].score = solution.score;
        let score = 0;
        Object.keys(state.finalGrade).forEach(
          (item) => (score += state.finalGrade[item].score)
        );
        state.score = score;
      }
    },
  },
});

export const { setScore, setValues, setfinalGrade, setClear } = grade.actions;

export default grade.reducer;

export const setInitialValue = ({ items, grade, type }): AppThunk => (
  dispatch
) => {
  dispatch(setClear());
  let totalScore = 0;
  let score = 0;
  const sortItems: IGradeItems = {};
  const finalGrade: ITaskOrderItems = {};
  items.map((item) => {
    sortItems[item.order]
      ? (sortItems[item.order] = [...sortItems[item.order], item])
      : (sortItems[item.order] = [item]);
    totalScore += item.maxScore;
    if (grade[item.id]) {
      score += grade[item.id].score || 0;
      finalGrade[item.id] = {
        score: grade[item.id].score,
        comment: type === 'EDIT' ? grade[item.id].comment : '',
      };
    } else {
      finalGrade[item.id] = { score: 0, comment: '' };
    }
  });
  dispatch(
    setValues({
      finalGrade,
      totalScore,
      score,
      sortItems,
    })
  );
};
