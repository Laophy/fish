export const formatNumber = (number) => {
  const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
  ];
  const base = 1000;
  const exponent = Math.floor(Math.log(number) / Math.log(base));

  if (exponent < 1) return Math.floor(number).toString();

  const index = Math.min(exponent, suffixes.length - 1);
  const shortNumber = (number / Math.pow(base, index)).toFixed(1);
  const formattedNumber = parseFloat(shortNumber).toString();

  return formattedNumber + suffixes[index];
};
