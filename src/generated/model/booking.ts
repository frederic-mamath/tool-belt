/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { User } from './user';
import type { Restaurant } from './restaurant';

export interface Booking {
  id: string;
  bookedSeatCount: number;
  createdAt: string;
  confirmedAt: string;
  canceledAt: string;
  user: User;
  restaurant: Restaurant;
}
