// Wedding Reservation System - API Client
// Copy this file to your frontend project

import {
  Guest,
  CreateGuestRequest,
  UpdateGuestRequest,
  RSVPResponse,
  CreateRSVPRequest,
  RSVPStats,
  InvitationCode,
  ValidateInvitationResponse,
  GuestSearchParams,
  ApiResponse,
  ApiError,
} from './wedding-reservation-types';

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const API_VERSION = '/api';

class WeddingReservationAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = `${baseURL}${API_VERSION}`;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  }

  // ============================================================================
  // GUEST ENDPOINTS
  // ============================================================================

  /**
   * Create a new guest
   * POST /guests
   */
  async createGuest(guestData: CreateGuestRequest): Promise<Guest> {
    return this.request<Guest>('/guests', {
      method: 'POST',
      body: JSON.stringify(guestData),
    });
  }

  /**
   * Get all guests
   * GET /guests
   */
  async getAllGuests(): Promise<Guest[]> {
    return this.request<Guest[]>('/guests');
  }

  /**
   * Get a specific guest by ID
   * GET /guests/:id
   */
  async getGuestById(id: string): Promise<Guest> {
    return this.request<Guest>(`/guests/${id}`);
  }

  /**
   * Search guests by name
   * GET /guests/search?name=:name
   */
  async searchGuestsByName(name: string): Promise<Guest[]> {
    return this.request<Guest[]>(
      `/guests/search?name=${encodeURIComponent(name)}`,
    );
  }

  /**
   * Update a guest
   * PATCH /guests/:id
   */
  async updateGuest(id: string, guestData: UpdateGuestRequest): Promise<Guest> {
    return this.request<Guest>(`/guests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(guestData),
    });
  }

  /**
   * Delete a guest
   * DELETE /guests/:id
   */
  async deleteGuest(id: string): Promise<void> {
    return this.request<void>(`/guests/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================================================
  // RSVP ENDPOINTS
  // ============================================================================

  /**
   * Submit RSVP for a guest
   * POST /rsvp/submit/:guestId
   */
  async submitRSVP(
    guestId: string,
    rsvpData: CreateRSVPRequest,
  ): Promise<RSVPResponse> {
    return this.request<RSVPResponse>(`/rsvp/submit/${guestId}`, {
      method: 'POST',
      body: JSON.stringify(rsvpData),
    });
  }

  /**
   * Get RSVP for a specific guest
   * GET /rsvp/guest/:guestId
   */
  async getGuestRSVP(guestId: string): Promise<RSVPResponse> {
    return this.request<RSVPResponse>(`/rsvp/guest/${guestId}`);
  }

  /**
   * Get all RSVPs
   * GET /rsvp
   */
  async getAllRSVPs(): Promise<RSVPResponse[]> {
    return this.request<RSVPResponse[]>('/rsvp');
  }

  /**
   * Get RSVP statistics
   * GET /rsvp/stats
   */
  async getRSVPStats(): Promise<RSVPStats> {
    return this.request<RSVPStats>('/rsvp/stats');
  }

  // ============================================================================
  // INVITATION ENDPOINTS
  // ============================================================================

  /**
   * Generate invitation code for a guest
   * POST /invitation/generate/:guestId
   */
  async generateInvitationCode(guestId: string): Promise<InvitationCode> {
    return this.request<InvitationCode>(`/invitation/generate/${guestId}`, {
      method: 'POST',
    });
  }

  /**
   * Validate invitation code
   * POST /invitation/validate/:code
   */
  async validateInvitationCode(code: string): Promise<Guest> {
    return this.request<Guest>(`/invitation/validate/${code}`, {
      method: 'POST',
    });
  }

  /**
   * Deactivate invitation code
   * DELETE /invitation/deactivate/:code
   */
  async deactivateInvitationCode(code: string): Promise<void> {
    return this.request<void>(`/invitation/deactivate/${code}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get invitation codes for a guest
   * GET /invitation/guest/:guestId
   */
  async getGuestInvitationCodes(guestId: string): Promise<InvitationCode[]> {
    return this.request<InvitationCode[]>(`/invitation/guest/${guestId}`);
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const weddingAPI = new WeddingReservationAPI();
export default weddingAPI;
