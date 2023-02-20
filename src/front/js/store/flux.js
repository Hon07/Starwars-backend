const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		people: [],
		planets: [],
		films: [],
		species: [],
		starships: [],
		vehicles: [],
		favorites: [],
	  },
	  actions: {
		getStarWars: async (resource, pagination = {}) => {
		  let params = "";
		  if (!!pagination.page) {
			params = `?page=${pagination.page}&limit=${pagination.limit || 10}`;
		  }
		  try {
			let resp = await fetch(`https://swapi.tech/api/${resource}${params}`);
			if (!resp.ok) {
			  console.error(`${resp.status}: ${resp.statusText}`);
			  return;
			}
			let data = await resp.json();
			let newStore = { ...getStore() };
			newStore[resource] = data.result || data.results;
			setStore(newStore);
			return {
			  records: data.total_records || null,
			  pages: data.total_pages || null,
			};
		  } catch (error) {
			console.error(error.message);
		  }
		},
		getStarWarsDetail: async (resource, id) => {
		  try {
			let resp = await fetch(`https://swapi.tech/api/${resource}/${id}`);
			if (!resp.ok) {
			  console.error(`${resp.status}: ${resp.statusText}`);
			  return;
			}
			let data = await resp.json();
			return {
			  ...data.result.properties,
			};
		  } catch (error) {
			console.error(error.message);
		  }
		},
		handleFavorites: (data) => {
		  let currentStore = getStore();
		  let favoriteIndex = currentStore.favorites.findIndex((fav) => fav.link == data.link);
		  if (favoriteIndex == -1) {
			setStore({
			  ...currentStore,
			  favorites: [...currentStore.favorites, data],
			});
		  } else {
			let newFavorites = [...currentStore.favorites];
			newFavorites.splice(favoriteIndex, 1);
			setStore({
			  ...currentStore,
			  favorites: newFavorites,
			});
		  }
		},
	  },
	};
  };
  
  export default getState;
  