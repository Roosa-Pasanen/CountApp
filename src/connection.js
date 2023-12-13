const connection = {
  fetchAll: async (add) => {
    try {
      const info = await fetch(add);
      const infoparse = await info.json();
      return infoparse;
    } catch (err) {
      console.log(err);
    }
  },
  putEntry: async (add, id, name, tags) => {
    fetch(`${add}/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id,
        name,
        tags,
      }),
    });
  },
  postEntry: async (add, id, name, tags) => {
    fetch(add, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id,
        name,
        tags,
      }),
    });
  },
};

export default connection;
