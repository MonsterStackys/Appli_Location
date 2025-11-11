import api from '../api';
import { Property } from '../mockData';

export const propertyService = {
  // Récupérer toutes les propriétés
  async getProperties(filters: any = {}, page = 1, perPage = 15) {
    const response = await api.get('/properties', {
      params: { ...filters, page, per_page: perPage }
    });
    // console.log(response.data);
    
    return response.data;
    
  },

  // Récupérer une propriété
  async getProperty(id: string) {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Créer une propriété
  async createProperty(data: FormData) {
    const response = await api.post('/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Modifier une propriété
  async updateProperty(id: string, data: Partial<Property>) {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  // Supprimer une propriété
  async deleteProperty(id: string) {
    await api.delete(`/properties/${id}`);
  },

  // Toggle favori
  async toggleFavorite(id: string) {
    const response = await api.post(`/properties/${id}/favorite`);
    return response.data;
  },

  // Mes propriétés
  async getMyProperties() {
    const response = await api.get('/my-properties');
    return response.data;
  },

  // Mes favoris
  async getFavorites() {
    const response = await api.get('/favorites');
    return response.data;
  }
};
