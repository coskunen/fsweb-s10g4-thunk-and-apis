import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import Item from "./components/Item";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(favState) {
  localStorage.setItem("s10g4", JSON.stringify(favState));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let isIncluded = state.favs.includes(
        action.payload["length"]
                );
                let newFavs = isIncluded
                ? [...state.favs , action.payload] 
                : [...state.favs]
                writeFavsToLocalStorage(newFavs);

      return {
        ...state ,
        favs : newFavs,
      };

    case FAV_REMOVE:
      writeFavsToLocalStorage(state.favs.filter((item) => item.length !== action.payload));
      return {
        ...state,
        favs : state.favs.filter((item) => item.length !== action.payload)
      };

    case FETCH_SUCCESS:
      return{
        ...state ,
        loading : false ,
        current : action.payload,
      };

    case FETCH_LOADING:
      return  { ...state ,
      loading : true,
    };;

    case FETCH_ERROR:
      return{
        ...state,
        current : null,
        loading : false,
        error : action.payload
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state ,
        favs : readFavsFromLocalStorage() == null ? [] : readFavsFromLocalStorage()
      }

    default:
      return state;
  }
}
