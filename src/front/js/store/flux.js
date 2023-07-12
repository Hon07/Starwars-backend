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
      getStarwars: async (element, pagination = {}) => {
        let params = "";
        if (!!pagination.page) {
          params = `?page=${pagination.page}&limit=${10}`;
        }
        let resp = await fetch(
          `https://www.swapi.tech/api/${element}${params}`
        );
        if (!resp.ok) {
          console.error(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        let newStore = { ...getStore() };
        newStore[element] = data.results || data.result;
        setStore(newStore);
        return {
          records: data.total_records || null,
          pages: data.total_pages || null,
        };
      },
      addFavorite: (entity) => {
        const store = getStore();
        setStore({
          ...store,
          favorites: [...store.favorites, entity],
        });
      },
      removeFavorites: (index) => {
        let currentStore = getStore();
        let NewFavorites = [...currentStore.favorites];
        NewFavorites.splice(index, 1);
        setStore({
          ...currentStore,
          favorites: NewFavorites,
        });
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
      /* handleFavorites: (data) => {
        let currentStore = getStore();
        let favoriteIndex = currentStore.favorites.findIndex(
          (fav) => fav.link == data.link
        );
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
      },*/
      handleFavorites: (data) => {
        let storeActions = getActions();
        let favoriteIndex = getStore().favorites.findIndex(
          (fav) => fav.link == data.link
        );
        if (favoriteIndex == -1) {
          storeActions.addFavorites(data);
        } else {
          storeActions.removeFavorites(favoriteIndex);
        }
      },
    },
  };
};

export default getState;
