/**
 * Bộ 11 bài test kiểm tra các hàm xử lý tính tiền dòng hàng của Rikkei Shop trong script.js
 */

// ==================== NHÓM 1: calcLineTotal (4 tests) ====================

// Test 1: Tính đúng thành tiền khi tham số là chuỗi số (tự động ép kiểu)
test("calcLineTotal: tính đúng thành tiền khi truyền vào chuỗi số (ví dụ: '450000', '2')", () => {
  expect(calcLineTotal("450000", "2")).toBe(900000);
});

// Test 2: Tính đúng thành tiền khi tham số là số nguyên
test("calcLineTotal: tính đúng thành tiền khi truyền vào số nguyên (ví dụ: 450000, 2)", () => {
  expect(calcLineTotal(450000, 2)).toBe(900000);
});

// Test 3: Trả về null khi đơn giá không hợp lệ (<= 0 hoặc không phải số)
test("calcLineTotal: trả về null khi đơn giá <= 0 hoặc không phải dạng số", () => {
  expect(calcLineTotal(0, 2)).toBe(null);
  expect(calcLineTotal(-50000, 2)).toBe(null);
  expect(calcLineTotal("abc", 2)).toBe(null);
  expect(calcLineTotal("", 2)).toBe(null);
});

// Test 4: Trả về null khi số lượng không hợp lệ (không phải số nguyên từ 1)
test("calcLineTotal: trả về null khi số lượng < 1, số thập phân hoặc không phải dạng số", () => {
  expect(calcLineTotal(450000, 0)).toBe(null);
  expect(calcLineTotal(450000, -1)).toBe(null);
  expect(calcLineTotal(450000, 1.5)).toBe(null);
  expect(calcLineTotal(450000, "abc")).toBe(null);
});

// ==================== NHÓM 2: calcVat (2 tests) ====================

// Test 5: Tính đúng VAT 8% cho số tiền hợp lệ
test("calcVat: tính đúng thuế VAT 8% cho số tiền hợp lệ", () => {
  expect(calcVat(900000)).toBe(72000);
  expect(calcVat(100000)).toBe(8000);
  expect(calcVat(0)).toBe(0);
});

// Test 6: Trả về null khi số tiền âm hoặc không phải kiểu số
test("calcVat: trả về null khi số tiền âm hoặc không phải kiểu số", () => {
  expect(calcVat(-1000)).toBe(null);
  expect(calcVat("900000")).toBe(null);
  expect(calcVat("abc")).toBe(null);
  expect(calcVat(null)).toBe(null);
  expect(calcVat(undefined)).toBe(null);
});

// ==================== NHÓM 3: formatVnd (2 tests) ====================

// Test 7: Định dạng chuẩn có dấu chấm phân cách hàng nghìn, triệu và chữ 'đ'
test("formatVnd: định dạng số lớn có dấu chấm phân cách hàng nghìn/triệu và kết thúc bằng ' đ'", () => {
  expect(formatVnd(1250000)).toBe("1.250.000 đ");
  expect(formatVnd(900000)).toBe("900.000 đ");
  expect(formatVnd(972000)).toBe("972.000 đ");
});

// Test 8: Định dạng chuẩn cho số nhỏ dưới 1.000 và số 0
test("formatVnd: định dạng số nhỏ (< 1.000) và số 0", () => {
  expect(formatVnd(950)).toBe("950 đ");
  expect(formatVnd(0)).toBe("0 đ");
});

// ==================== NHÓM 4: buildReceiptLine (3 tests) ====================

// Test 9: Dựng đúng định dạng phiếu thanh toán khi dữ liệu hợp lệ
test("buildReceiptLine: dựng chuỗi phiếu đúng mẫu '<tên> x<số lượng>: <thành tiền> + VAT <VAT> = <tổng>'", () => {
  expect(buildReceiptLine("Tai nghe Bluetooth", 450000, 2)).toBe(
    "Tai nghe Bluetooth x2: 900.000 đ + VAT 72.000 đ = 972.000 đ"
  );
});

// Test 10: Tự động cắt bỏ khoảng trắng thừa ở hai đầu của tên hàng
test("buildReceiptLine: tự động cắt khoảng trắng thừa ở đầu và cuối tên hàng", () => {
  expect(buildReceiptLine(" Tai nghe Bluetooth ", 450000, 2)).toBe(
    "Tai nghe Bluetooth x2: 900.000 đ + VAT 72.000 đ = 972.000 đ"
  );
  expect(buildReceiptLine("   Bàn phím cơ DareU   ", 500000, 1)).toBe(
    "Bàn phím cơ DareU x1: 500.000 đ + VAT 40.000 đ = 540.000 đ"
  );
});

// Test 11: Trả về chuỗi thông báo lỗi khi thông tin không hợp lệ
test("buildReceiptLine: trả về 'Dữ liệu dòng hàng không hợp lệ' khi tên trống hoặc dữ liệu tính toán sai", () => {
  expect(buildReceiptLine("Áo thun", "abc", 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
  expect(buildReceiptLine("", 450000, 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
  expect(buildReceiptLine("   ", 450000, 2)).toBe("Dữ liệu dòng hàng không hợp lệ");
  expect(buildReceiptLine("Tai nghe", 450000, 0)).toBe("Dữ liệu dòng hàng không hợp lệ");
});
