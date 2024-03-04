<script setup lang="ts">
const gradients = [
  ["#fde047", "#facc15"],
  ["#d8b4fe", "#c084fc"],
  ["#fca5a5", "#f87171"],
  ["#86efac", "#4ade80"],
  ["#93c5fd", "#60a5fa"],
];
const randomGradient = function () {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const font = "font-size: 12px; ";
const getGradient = function (n: string[]) {
  return "linear-gradient(90deg, ".concat(n[0], " 0%, ").concat(n[1], " 100%)");
};
const getLineStyle = function (n: string[]) {
  return "background: ".concat(getGradient(n), "; border-radius: 0.125rem;");
};

const stringWithRandomLength = function () {
  return " ".repeat(Math.floor(Math.random() * 16) + 4);
};

const line1 = "%c " + stringWithRandomLength() + "%c %c " + stringWithRandomLength();
const line2 = "%c " + stringWithRandomLength();
const line3 = "%c " + stringWithRandomLength();
const line4 = "%c " + stringWithRandomLength() + "%c %c " + stringWithRandomLength();

const text = ["", line1, "", line2, "", "%c       Eirik Mo  ", "", line3, "", line4, ""].join("\n");

const styles = [
  `${font}${getLineStyle(randomGradient())}${stringWithRandomLength()}`,
  `${font}background: none;`,
  `${font}background: #a1a1aa; border-radius: 0.125rem;`,
  `${font}${getLineStyle(randomGradient())}`,
  "color: #a1a1aa; font-size: 20px; font-family: sans-serif;",
  `${font}${getLineStyle(randomGradient())}`,
  `${font}background: #a1a1aa; border-radius: 0.125rem;`,
  `${font}background: none;`,
  `${font}${getLineStyle(randomGradient())}`,
];

console.log(text, ...styles);
</script>
