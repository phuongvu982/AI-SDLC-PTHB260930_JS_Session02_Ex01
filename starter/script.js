/**
 * Mô-đun tính tiền dòng hàng và phiếu tạm tính của Rikkei Shop
 * Bài tập JS Session 02 - Ex 01
 */

/**
 * Tính thành tiền của một dòng hàng: Thành tiền = Đơn giá x Số lượng.
 * Chấp nhận tham số là số hoặc chuỗi số; tự động ép kiểu trước khi tính.
 * @param {number|string} unitPrice - Đơn giá sản phẩm (lớn hơn 0)
 * @param {number|string} quantity - Số lượng mua (số nguyên từ 1)
 * @returns {number|null} Thành tiền dạng số, hoặc null nếu dữ liệu không hợp lệ
 */
function calcLineTotal(unitPrice, quantity) {
  // Loại trừ dữ liệu không hợp lệ: null, undefined, boolean hoặc chuỗi rỗng
  if (unitPrice === null || quantity === null) return null;
  if (typeof unitPrice === "boolean" || typeof quantity === "boolean") return null;
  if (typeof unitPrice === "string" && unitPrice.trim() === "") return null;
  if (typeof quantity === "string" && quantity.trim() === "") return null;

  // Ép kiểu tường minh sang Number
  const price = Number(unitPrice);
  const qty = Number(quantity);

  // Kiểm tra tính hợp lệ: đơn giá phải > 0, số lượng phải là số nguyên >= 1
  if (isNaN(price) || isNaN(qty)) return null;
  if (price <= 0) return null;
  if (!Number.isInteger(qty) || qty < 1) return null;

  return price * qty;
}

/**
 * Tính thuế VAT 8% của một số tiền.
 * @param {number} amount - Số tiền cần tính thuế (số không âm)
 * @returns {number|null} Tiền VAT (số nguyên), hoặc null nếu không phải số hoặc số âm
 */
function calcVat(amount) {
  // Kiểm tra amount phải là kiểu number, không phải NaN và không âm
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return null;
  }
  // Mọi số tiền là bội số 1.000đ nên kết quả là số nguyên
  return Math.round(amount * 0.08);
}

/**
 * Định dạng số nguyên thành chuỗi tiền tệ VNĐ có dấu chấm phân cách hàng nghìn.
 * Ví dụ: 1250000 -> "1.250.000 đ", 950 -> "950 đ", 0 -> "0 đ"
 * @param {number} amount - Số nguyên không âm dưới 1 tỷ
 * @returns {string|null} Chuỗi định dạng tiền tệ kèm ' đ', hoặc null nếu dữ liệu không hợp lệ
 */
function formatVnd(amount) {
  if (
    typeof amount !== "number" ||
    !Number.isInteger(amount) ||
    amount < 0 ||
    amount >= 1000000000
  ) {
    return null;
  }
  // Sử dụng regex chèn dấu chấm phân cách mỗi 3 chữ số
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
}

/**
 * Dựng chuỗi in dòng phiếu thanh toán cho một mặt hàng.
 * Định dạng: <tên> x<số lượng>: <thành tiền> + VAT <VAT> = <tổng>
 * Hàm tái sử dụng các hàm calcLineTotal, calcVat, formatVnd bên trên.
 * @param {string} name - Tên sản phẩm
 * @param {number|string} unitPrice - Đơn giá sản phẩm
 * @param {number|string} quantity - Số lượng mua
 * @returns {string} Chuỗi hiển thị phiếu thanh toán hoặc thông báo lỗi
 */
function buildReceiptLine(name, unitPrice, quantity) {
  // Kiểm tra tên sản phẩm: phải là chuỗi không rỗng sau khi loại bỏ khoảng trắng hai đầu
  if (typeof name !== "string" || name.trim() === "") {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Gọi hàm calcLineTotal để tính thành tiền (đã kiểm tra đơn giá và số lượng)
  const lineTotal = calcLineTotal(unitPrice, quantity);
  if (lineTotal === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Gọi hàm calcVat để tính thuế VAT 8%
  const vat = calcVat(lineTotal);
  if (vat === null) {
    return "Dữ liệu dòng hàng không hợp lệ";
  }

  // Tính tổng số tiền dòng hàng = Thành tiền + VAT
  const total = lineTotal + vat;

  // Chuẩn hóa tên và số lượng để hiển thị
  const cleanName = name.trim();
  const cleanQuantity = Number(quantity);

  // Dựng chuỗi kết quả bằng template literal
  return `${cleanName} x${cleanQuantity}: ${formatVnd(lineTotal)} + VAT ${formatVnd(vat)} = ${formatVnd(total)}`;
}
