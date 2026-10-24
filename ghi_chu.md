# BÁO CÁO SỬA LỖI MÔ-ĐUN TÍNH TIỀN DÒNG HÀNG (JS SESSION 02 - EX 01)
**Học viên:** Vũ Ngọc Minh Phương  
**Khóa học:** AI-SDLC • Lớp PTHB260930  
**Mô-đun:** Giỏ hàng và thanh toán - Rikkei Shop  

---

## 1. Báo cáo các Test Case phát hiện lỗi trên mã nguồn ban đầu

| STT | Dữ liệu đầu vào (Input) | Kết quả thực tế bị lỗi (Buggy Output) | Kết quả kỳ vọng đúng (Expected Output) | Dòng code gây lỗi (Failing Line of Code) | Giải thích nguyên nhân (Logic Note) |
|:---:|---|:---:|:---:|---|---|
| **1** | `calcLineTotal("450000", "2")` | `"4500002"` | `900000` | `return unitPrice + quantity;` | Hai chuỗi nhận từ form bị nối với nhau bằng toán tử `+`, chưa chuyển đổi sang kiểu số và chưa thực hiện phép nhân. |
| **2** | `calcVat(900000)` | `720000` | `72000` | `return amount * 0.8;` | Đặt hệ số thuế là `0.8` (tương đương 80%) thay vì `0.08` (8%), làm tiền thuế VAT tăng vọt gấp 10 lần thực tế. |
| **3** | `formatVnd(1250000)` | `"1250000 d"` | `"1.250.000 đ"` | `return amount + " d";` | Chỉ ghép chuỗi đơn giản, chưa có cơ chế phân tách nhóm 3 chữ số bằng dấu chấm và dùng chữ `"d"` thường không dấu thay vì `"đ"`. |
| **4** | `buildReceiptLine(" Tai nghe Bluetooth ", 450000, 2)` | `" Tai nghe Bluetooth x2: 450002 d + VAT 360001.6 d = 810003.6 d"` | `"Tai nghe Bluetooth x2: 900.000 đ + VAT 72.000 đ = 972.000 đ"` | `return name + " x" + quantity + ...` | Chưa gọi `.trim()` nên khoảng trắng thừa làm tên bị lệch; dùng phép cộng chuỗi thô sơ thay vì template literal; và không kiểm tra dữ liệu đầu vào không hợp lệ để trả về `"Dữ liệu dòng hàng không hợp lệ"`. |

---

## 2. Ghi chú tóm tắt quá trình sửa đổi (3 - 5 câu)

1. Trong bài tập này, em đã rà soát và khắc phục triệt để các lỗi logic về kiểu dữ liệu và toán tử trong mô-đun `script.js` của Rikkei Shop.
2. Tại hàm `calcLineTotal`, em thực hiện ép kiểu số tường minh bằng `Number()`, đồng thời kiểm tra chặt chẽ điều kiện đơn giá lớn hơn 0 và số lượng phải là số nguyên từ 1 trở lên để ngăn ngừa hiện tượng nối chuỗi sai lệch.
3. Tại hàm `calcVat` và `formatVnd`, em sửa tỷ lệ thuế từ 80% về chuẩn 8% (`0.08`), đồng thời ứng dụng biểu thức chính quy (Regex) để tự động thêm dấu chấm ngăn cách hàng nghìn theo đúng quy chuẩn tiền tệ Việt Nam (`.toLocaleString` / regex).
4. Ở hàm `buildReceiptLine`, em sử dụng `.trim()` để chuẩn hóa tên mặt hàng, tái sử dụng kết quả từ ba hàm trước theo đúng kiến trúc mô-đun, và bắt lỗi trả về thông báo `"Dữ liệu dòng hàng không hợp lệ"` khi thông tin đầu vào bị sai.
5. Sau khi hoàn tất sửa đổi, toàn bộ 11/11 test case trong `tests.html` đã đạt 100% và giao diện tính tiền `index.html` vận hành hoàn hảo, chính xác.
