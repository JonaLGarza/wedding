// Wedding Reservation System - Frontend Types
// Copy this file to your frontend project

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  isPrimaryGuest: boolean;
  primaryGuest?: Guest;
  additionalGuests?: Guest[];
  numberOfGuests?: number;
  maxGuests?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGuestRequest {
  name: string;
  phone?: string;
  email?: string;
  numberOfGuests?: number;
  maxGuests?: number;
  isPrimaryGuest?: boolean;
  primaryGuestId?: string;
}

export interface UpdateGuestRequest {
  name?: string;
  phone?: string;
  email?: string;
  numberOfGuests?: number;
  maxGuests?: number;
  isPrimaryGuest?: boolean;
  primaryGuestId?: string;
}

// ============================================================================
// RSVP TYPES
// ============================================================================

export interface RSVPResponse {
  id: string;
  guest: Guest;
  attending: boolean;
  guestCount: number;
  dietaryRestrictions?: string;
  specialRequests?: string;
  submittedAt: Date;
  updatedAt: Date;
}

export interface CreateRSVPRequest {
  attending: boolean;
  guestCount: number;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

export interface RSVPStats {
  totalGuests: number;
  attendingGuests: number;
  notAttendingGuests: number;
  pendingResponses: number;
}

// ============================================================================
// INVITATION TYPES
// ============================================================================

export interface InvitationCode {
  id: string;
  code: string;
  guest: Guest;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface ValidateInvitationResponse {
  guest: Guest;
  invitationCode: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface GuestSearchParams {
  name: string;
}

// ============================================================================
// FRONTEND STATE TYPES
// ============================================================================

export interface ReservationState {
  currentGuest: Guest | null;
  rsvpResponse: RSVPResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface GuestListState {
  guests: Guest[];
  filteredGuests: Guest[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

export interface RSVPFormState {
  attending: boolean;
  guestCount: number;
  dietaryRestrictions: string;
  specialRequests: string;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// ============================================================================
// FORM VALIDATION TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type GuestStatus = 'pending' | 'attending' | 'not-attending';
export type RSVPStatus = 'submitted' | 'pending' | 'not-submitted';

export interface GuestWithStatus extends Guest {
  status: GuestStatus;
  rsvpStatus: RSVPStatus;
  rsvpResponse?: RSVPResponse;
}
