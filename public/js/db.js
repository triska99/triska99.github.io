const dbPromised = idb.open("football_database2", 1, (upgradeDb) => {
  upgradeDb.createObjectStore("schedules", {
    keyPath: "id",
  });
});

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("schedules", "readonly");
        let store = tx.objectStore("schedules");
        return store.getAll();
      })
      .then((data) => {
        resolve(data);
      });
  });
}

function saveForLater(data) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("schedules", "readwrite");
      let store = tx.objectStore("schedules");
      console.log(data);
      store.put(data.match);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: 'Berhasil Disimpan Ke Favorite' })
    });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("schedules", "readonly");
        let store = tx.objectStore("schedules");

        return store.get(Number(id));
      })
      .then((data) => {
        resolve(data);
        console.log(data);
      })
      .then((er) => {
        reject(er);
      });
  });
}

function deleteData(id) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("schedules", "readwrite");
      let store = tx.objectStore("schedules");
      store.delete(Number(id));
      console.log(id);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: 'Data Berhasil Dihapus' })
    });
};