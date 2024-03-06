// Lấy thẻ p có id="message"
var message = document.querySelector(".text-center");

// Đợi 3 giây
setTimeout(function () {
  // Thêm lớp d-block để hiển thị thẻ
  message.classList.add("d-none");
}, 3000);

$(".remove-item").click(function () {
  var id = $(this).data("id");
  const card = $(this).closest(".card"); //lấy thẻ card tương ứng để xóa

  document.querySelector(".product-delete").innerHTML = id;
  // Thực hiện xóa sản phẩm với id này
  const confirmDeleteProduct = document.querySelector(".btn-delete");
  confirmDeleteProduct.addEventListener("click", () => {
    fetch(`/index/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          card.remove();
          const message = document.createElement("p");
          message.classList.add("text-center");
          message.classList.add("text-success");
          message.innerText = data.message;
          document.querySelector(".message").appendChild(message);
          setTimeout(function () {
            // Thêm lớp d-block để hiển thị thẻ
            message.classList.add("d-none");
          }, 3000);
        }
      });
  });
});

$(".update-item").click(function () {
  var id = $(this).data("id");
  console.log(id);
  const card = $(this).closest(".card");
  const productName = card.find(".card-title a");
  const productPrice = card.find(".price");
  const form = document.querySelector("#updateProductForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(1111);
    const name = form.querySelector("#new-name-product").value;
    const price = form.querySelector("#new-price-product").value;

    fetch(`/index/update-product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          productName.text(name);
          productPrice.text("Giá: " + price + " đ");
          $("#update-dialog").modal("hide");
          form.querySelector("#new-name-product").value = "";
          form.querySelector("#new-price-product").value = "";
          const message = document.querySelector(".messages");
          message.innerText = data.message;
          message.style.display = "block";
          setTimeout(function () {
            // Thêm lớp d-block để hiển thị thẻ
            message.style.display = "none";
          }, 3000);
        }
      });
  });
});
