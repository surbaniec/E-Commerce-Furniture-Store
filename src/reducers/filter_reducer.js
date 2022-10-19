import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = filtered_products.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts = filtered_products
          .sort((a, b) => a.price - b.price)
          .reverse();
      }
      if (sort === 'name-a') {
        tempProducts = filtered_products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        tempProducts = filtered_products.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;

      const { text, company, category, color, price, shipping } = state.filters;
      let temporaryProducts = [...all_products];

      if (text) {
        temporaryProducts = temporaryProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      return {
        ...state,
        filtered_products: temporaryProducts,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      return state;
  }
};

export default filter_reducer;
