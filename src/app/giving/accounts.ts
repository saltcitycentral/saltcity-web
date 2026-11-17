/**
 * The church's giving accounts. The single list every giving page reads from,
 * so a number changed here is changed everywhere.
 */
export type Account = {
  purpose: string;
  bank: string;
  number: string;
  currency: "Naira" | "Dollar" | "Pound";
};

export const ACCOUNT_NAME = "SaltCity Church";

export const ACCOUNTS: Account[] = [
  { purpose: "Partnership", bank: "Zenith Bank", number: "1015095018", currency: "Naira" },
  { purpose: "Property Partnership", bank: "Fidelity Bank", number: "4150051597", currency: "Naira" },
  { purpose: "Offerings", bank: "Access Bank", number: "0073530847", currency: "Naira" },
  { purpose: "Offerings", bank: "GTBank", number: "0431944413", currency: "Naira" },
  { purpose: "Offerings", bank: "GTBank", number: "0469266462", currency: "Dollar" },
  { purpose: "Offerings", bank: "GTBank", number: "0469266479", currency: "Pound" },
];

/** The info desk, which also takes payment confirmations on WhatsApp. */
export const INFO_DESK = {
  display: "0803 059 7015",
  whatsapp: "https://wa.me/2348030597015",
  tel: "tel:+2348030597015",
};

export const PASTOR_EMAIL = "tobore@saltcitycentral.org";
