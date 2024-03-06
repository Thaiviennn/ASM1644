$(".deleteOrders").click(function (e) {
  const id = $(this).data("id");
  var tr = $(this).closest("tr"); //lấy ra thẻ tr
  console.log(tr);
  document.querySelector(".product-delete").innerHTML = id;
  const btnConfirmDelete = document.querySelector(".btn-delete");

  btnConfirmDelete.addEventListener("click", () => {
    fetch(`/index/order/delete-order/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 202) {
          tr.remove();
        }
      });
  });
});
