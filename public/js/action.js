document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  const btnSave = document.getElementById("save");
  const btnDeletes = document.getElementById("delete");
  const item = getMatchById();

  if (isFromSaved) {
    btnSave.style.display = 'none';
    btnDeletes.style.display = 'block';

    getSavedMatchById();
  } else {
    btnSave.style.display = 'block';
    btnDeletes.style.display = 'none';
    getMatchById();
  }
  btnSave.onclick = () => {
    console.log("Tombol FAB di klik.");
    item.then(data => {
      saveForLater(data);
    });
  };

  const hapus = new URLSearchParams(window.location.search).get('id');
  btnDeletes.onclick = () => {
    deleteData(hapus);
  };
});