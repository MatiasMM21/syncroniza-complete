import axios, { AxiosError, AxiosInstance } from 'axios';
import { BASE_URL } from "./constants";

export interface IServerResponse<T> {
    data: T;
    message: string;
}
export interface IResponse<T> {
    data: T | null;
    error: string | null;
}


export default class ClientAxios {
    private static instance: ClientAxios;
    private axios: AxiosInstance;

    private constructor() {
        this.axios = new (axios.create as any)({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }) as AxiosInstance;
    }

    public static getInstance(): ClientAxios {
        if (!ClientAxios.instance) {
            ClientAxios.instance = new ClientAxios();
        }
        return ClientAxios.instance;
    }


    async login(email: string, password: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.post('/auth/login', { email, password });
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.message };
        }
    }

    async register(name: string, email: string, password: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.post('/auth/register', { name, email, password });
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async getProjects(): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get('/projects');
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async getPlanifications(projectId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get(`/planifications?project=${projectId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.planifications, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async updatePlanification(planification: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.put(`/planifications/${planification._id}`, planification);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.planification, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async getControlSheets(projectId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get(`/controlSheets?project=${projectId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.controlSheets, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async updateControlSheet(controlSheet: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.put(`/controlSheets/${controlSheet._id}`, controlSheet);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.controlSheet, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async getTransactions(projectId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get(`/transactions?project=${projectId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.transactions, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    async updateTransaction(transaction: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.put(`/transactions/${transaction._id}`, transaction);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.transaction, error: null };
        } catch (e: any) {
            return { data: null, error: e.response.data.error };
        }
    }

    // Métodos BIM
    async getBimModel(projectId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get(`/api/bim/model/${projectId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al obtener modelo BIM' };
        }
    }

    async uploadBimModel(projectId: string, url: string, modelType: string, metadata: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.post(`/api/bim/model/${projectId}`, {
                url,
                modelType,
                metadata
            });
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.model, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al subir modelo BIM' };
        }
    }

    async getBimWeekPlans(projectId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.get(`/api/bim/weekplans/${projectId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al obtener planes semanales BIM' };
        }
    }

    async createBimWeekPlan(projectId: string, weekPlanData: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.post(`/api/bim/weekplans/${projectId}`, weekPlanData);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.weekPlan, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al crear plan semanal BIM' };
        }
    }

    async updateBimWeekPlan(weekPlanId: string, weekPlanData: any): Promise<IResponse<any>> {
        try {
            let response = await this.axios.put(`/api/bim/weekplans/${weekPlanId}`, weekPlanData);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data.weekPlan, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al actualizar plan semanal BIM' };
        }
    }

    async deleteBimWeekPlan(weekPlanId: string): Promise<IResponse<any>> {
        try {
            let response = await this.axios.delete(`/api/bim/weekplans/${weekPlanId}`);
            if (response.data.error) {
                return { data: null, error: response.data.error };
            }
            return { data: response.data, error: null };
        } catch (e: any) {
            return { data: null, error: e.response?.data?.message || 'Error al eliminar plan semanal BIM' };
        }
    }
    
    // Métodos HTTP genéricos
    async get(url: string, config?: any): Promise<any> {
        try {
            const response = await this.axios.get(url, config);
            return response.data;
        } catch (error: any) {
            console.error(`Error en GET ${url}:`, error);
            throw error;
        }
    }
    
    async post(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.axios.post(url, data, config);
            return response.data;
        } catch (error: any) {
            console.error(`Error en POST ${url}:`, error);
            throw error;
        }
    }
    
    async put(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.axios.put(url, data, config);
            return response.data;
        } catch (error: any) {
            console.error(`Error en PUT ${url}:`, error);
            throw error;
        }
    }
    
    async delete(url: string, config?: any): Promise<any> {
        try {
            const response = await this.axios.delete(url, config);
            return response.data;
        } catch (error: any) {
            console.error(`Error en DELETE ${url}:`, error);
            throw error;
        }
    }
    
    async patch(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.axios.patch(url, data, config);
            return response.data;
        } catch (error: any) {
            console.error(`Error en PATCH ${url}:`, error);
            throw error;
        }
    }
}