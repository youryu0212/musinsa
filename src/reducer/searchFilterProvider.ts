import { useReducer } from 'src/utils/useReducer';
import { filter } from 'src/utils/utils';

type ActionType = {
  type: string;
  words?: string;
  isOpen?: boolean;
  fromSearchBar?: boolean;
  length?: number;
};

const searchFilterInitState = {
  words: [],
  isOpen: false,
};

const filterFromSearchBar = filter(({ fromSearchBar }) => !fromSearchBar);

const searchFilterReducer = (state, action: ActionType) => {
  switch (action.type) {
    case 'SEARCH':
      const { fromSearchBar } = action;
      if (fromSearchBar) {
        return {
          ...state,
          words: [...filterFromSearchBar(state.words), { word: action.words, fromSearchBar }],
        };
      }
      return {
        ...state,
        words: [...state.words, { word: action.words }],
      };
    case 'REMOVE':
      return {
        ...state,
        words: state.words.filter((word) => word.word !== action.words),
      };
    case 'SEARCH_RESET':
      return {
        ...state,
        words: [],
      };
    case 'SEARCH_BAR_TOGGLE':
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case 'SEARCH_RESULT':
      return {
        ...state,
        length: action.length,
      };
  }
};

const useSearchFilter = () => useReducer(searchFilterReducer, searchFilterInitState);
const searchFilterContext = useSearchFilter();

export default searchFilterContext;
