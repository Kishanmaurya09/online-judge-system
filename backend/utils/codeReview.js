export const reviewCode = (code) => {
  let feedback = [];

  if (code.includes("for") && code.match(/for/g).length > 1) {
    feedback.push("⚠ Multiple loops detected — Time complexity may be high");
  }

  if (code.length < 20) {
    feedback.push("⚠ Code too short — logic might be incomplete");
  }

  if (code.includes("var ")) {
    feedback.push("⚠ Avoid 'var' — use let/const");
  }

  if (!code.includes("input")) {
    feedback.push("ℹ No input handling detected");
  }

  if (feedback.length === 0) {
    feedback.push("✅ Code looks clean and efficient");
  }

  return feedback;
};