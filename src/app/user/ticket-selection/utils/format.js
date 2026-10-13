
export const formatRupiah = (value) =>
  `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;

export const shortPrice = (value) =>
  `Rp${(value / 1000000).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  })}jt`;
