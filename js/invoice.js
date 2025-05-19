
document.addEventListener("DOMContentLoaded", function () {
  const data = JSON.parse(localStorage.getItem("invoiceItem") || "[]");
  if (data.length === 0) return;

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  let totalKeseluruhan = 0;

  data.forEach(item => {
    const qty = item.quantity || 1;
    const harga = parseInt(item.priceText.replace(/[^0-9]/g, '')) || 0;
    const total = harga * qty;
    totalKeseluruhan += total;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${qty}</td>
      <td>${item.priceText}</td>
      <td>Rp. ${total.toLocaleString("id-ID")}</td>
    `;
    tbody.appendChild(tr);
  });

  const trTotal = document.createElement("tr");
  trTotal.className = "total";
  trTotal.innerHTML = `
    <td colspan="3" style="text-align:right;"><strong>Total</strong></td>
    <td><strong>Rp. ${totalKeseluruhan.toLocaleString("id-ID")}</strong></td>
  `;
  tbody.appendChild(trTotal);
});


function hapusPesanan() {
  if (confirm("Apakah Anda yakin ingin menghapus semua pesanan?")) {
    localStorage.removeItem("invoiceItem");
    location.reload();
  }
}

function lanjutKeCheckout() {
  const name = document.getElementById("custName").value.trim();
  const addr = document.getElementById("custAddr").value.trim();
  if (!name || !addr) {
    alert("Silakan isi nama dan alamat terlebih dahulu.");
    return;
  }
  // Simpan data pelanggan ke localStorage jika diperlukan
  localStorage.setItem("customerInfo", JSON.stringify({ name, addr }));
  window.location.href = "checkout.html";
}
