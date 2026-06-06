/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlotGame {
  id: string;
  title: string;
  imageUrl: string;
  isFeatured?: boolean;
  rtp: string; // e.g. "96.5%"
  volatility: "Alta" | "Media" | "Baja";
  maxWin: string; // e.g. "x5,000"
  description: string;
  category: "Slots" | "Ruleta" | "Cartas";
}

export interface Withdrawal {
  id: string;
  username: string;
  amount: number;
  method: string;
  timestamp: string;
  isWin: boolean;
  game?: string;
}

export interface ClientComment {
  id: string;
  username: string;
  text: string;
  rating: number;
  timeAgo: string;
}

export interface WalletMethod {
  id: string;
  name: string;
  logoUrl: string;
}
