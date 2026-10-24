/**
 * Test Harness dành cho kiểm thử tự động các hàm trong script.js
 */
const testSuite = [];

function test(description, testFn) {
  testSuite.push({ description, testFn });
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Kỳ vọng: ${JSON.stringify(expected)} (${typeof expected}), nhưng nhận được: ${JSON.stringify(actual)} (${typeof actual})`);
      }
    },
    toBeCloseTo(expected, delta = 0.001) {
      if (Math.abs(actual - expected) > delta) {
        throw new Error(`Kỳ vọng xấp xỉ: ${expected}, nhưng nhận được: ${actual}`);
      }
    }
  };
}

function runTests() {
  const container = document.getElementById("test-results");
  let passedCount = 0;
  const total = testSuite.length;

  const resultItems = [];

  testSuite.forEach((t, index) => {
    let passed = false;
    let errorMsg = "";
    try {
      t.testFn();
      passed = true;
      passedCount++;
    } catch (err) {
      errorMsg = err.message;
    }

    resultItems.push({
      index: index + 1,
      description: t.description,
      passed,
      errorMsg
    });
  });

  if (container) {
    const summaryCard = document.getElementById("test-summary");
    if (summaryCard) {
      summaryCard.className = passedCount === total ? "summary-box pass" : "summary-box fail";
      summaryCard.innerHTML = `
        <div class="summary-badge">${passedCount === total ? "✓" : "✗"}</div>
        <div class="summary-text">
          <div class="summary-number">${passedCount}/${total} test đạt</div>
          <div class="summary-sub">${passedCount === total ? "Tất cả các bài kiểm tra đã vượt qua thành công! (100%)" : "Có test case chưa vượt qua, hãy kiểm tra mã nguồn."}</div>
        </div>
      `;
    }

    container.innerHTML = resultItems.map(item => `
      <div class="test-item ${item.passed ? "test-pass" : "test-fail"}">
        <div class="test-header">
          <span class="test-badge">${item.passed ? "PASS" : "FAIL"}</span>
          <span class="test-title"><strong>Test ${item.index}:</strong> ${item.description}</span>
        </div>
        ${!item.passed ? `<div class="test-error">${item.errorMsg}</div>` : ""}
      </div>
    `).join("");
  }

  return { passedCount, total };
}

window.addEventListener("DOMContentLoaded", () => {
  runTests();
});
