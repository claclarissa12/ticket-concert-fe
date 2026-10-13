
export const W = 1200;
export const H = 680;
export const PITCH = 14;
export const SEAT = 10;

export const TIERS = {
  suite: { label: "Suite Box", price: 5000000, color: "#B79CFF" },
  f1: { label: "Floor 1xx", price: 3500000, color: "#6FA8FF" },
  f2: { label: "Floor 2xx", price: 2500000, color: "#46D6C0" },
  f3: { label: "Floor 3xx", price: 1800000, color: "#F2C14E" },
};

function buildSection({ id, label, short, tier, x, y, rows, cols, index }) {
  const seats = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const row = String.fromCharCode(65 + r);

      seats.push({
        id: `${id}-${row}${c + 1}`,
        sectionId: id,
        sectionLabel: label,
        row,
        num: c + 1,
        x: x + c * PITCH + 2,
        y: y + r * PITCH + 2,
        price: TIERS[tier].price,
        sold: (r * 7 + c * 13 + index * 5) % 11 < 2,
      });
    }
  }

  return {
    id,
    label,
    short,
    tier,
    x,
    y,
    rows,
    cols,
    w: cols * PITCH,
    h: rows * PITCH,
    price: TIERS[tier].price,
    seats,
    available: seats.filter((seat) => !seat.sold).length,
  };
}

function buildVenue() {
  const sections = [];
  let index = 0;

  ["f1", "f2", "f3"].forEach((tier, t) => {
    for (let c = 0; c < 3; c++) {
      const num = `${t + 1}0${c + 1}`;

      sections.push(
        buildSection({
          id: `floor-${num}`,
          label: `FLOOR ${num}`,
          short: num,
          tier,
          x: 282 + c * 220,
          y: 150 + t * 140,
          rows: 8,
          cols: 14,
          index: index++,
        })
      );
    }
  });

  for (let j = 0; j < 9; j++) {
    const bottom = j >= 3 && j < 6;
    const left = j >= 6;

    sections.push(
      buildSection({
        id: `suite-${j + 1}`,
        label: `SUITE BOX ${j + 1}`,
        short: `BOX ${j + 1}`,
        tier: "suite",
        x: bottom ? 392 + (j - 3) * 152 : left ? 186 : 958,
        y: bottom ? 592 : 150 + (left ? j - 6 : j) * 112,
        rows: bottom ? 4 : 6,
        cols: bottom ? 8 : 4,
        index: index++,
      })
    );
  }

  return sections;
}

export const VENUE = buildVenue();

export const SEAT_INDEX = Object.fromEntries(
  VENUE.flatMap((section) =>
    section.seats.map((seat) => [seat.id, seat])
  )
);
