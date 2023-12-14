const connection = {
  fetchAll: async (add) => {
    try {
      const info = await fetch(add);
      const infoparse = info.json();
      return infoparse;
    } catch (err) {
      console.log(err);
    }
  },
  putEntry: (add, id, name, tags) => {
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
  postEntry: (add, id, name, tags) => {
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
  deleteEntry: async (add, id) => {
    fetch(`${add}/${id}`, {
      method: "delete",
    });
  },
};

export default connection;
