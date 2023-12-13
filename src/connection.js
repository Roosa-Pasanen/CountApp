const connection = {
  fetchAll: async (add) => {
    try {
      const info = await fetch(add);
      const infoparse = await info.json();
      console.log(infoparse);
      return infoparse;
    } catch (err) {
      console.log(err);
    }
  },
  putEntry: async (add, JSONinfo) => {
    /**/
  },
  postEntry: async (add, JSONinfo) => {
    /**/
  },
};

export default connection;
