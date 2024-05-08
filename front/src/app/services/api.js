import axios from 'axios';

const baseURL = 'http://localhost:5265';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  let token = JSON.parse(localStorage.getItem('token'));
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      let apiResponse = await UserService.refreshToken({
        withCredentials: true,
      });
      localStorage.setItem('token', JSON.stringify(apiResponse.data.token));
      error.config.headers['Authorization'] = `Bearer ${apiResponse.data.token}`;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  },
);

export const UserService = {
  async login(payload) {
    return api.post('/Auth/login', payload);
  },
  async register(payload) {
    return api.post('/Auth/register', payload);
  },
  async logout() {
    return api.post('/Auth/logout');
  },
  async fetchUserData() {
    return api.get('/Acc/getByUsername');
  },
  async checkCredentials(payload) {
    return api.post('/Auth/checkCredentials', payload);
  },
  async changePassword(payload) {
    return api.patch('/Acc/changePassword', payload);
  },
  async getStatus() {
    return api.get('/Auth/getStatus');
  },
  async refreshToken(payload) {
    return api.post('/Auth/refresh-token', payload);
  },
};

export const TaskService = {
  async getById(payload) {
    return api.get(`/Task/getById/${payload.Id}`);
  },
  async getByAccount(payload) {
    console.log(payload);
    return api.get(`/Task/getByAccount/${payload.AccountId}`);
  },
  async create(payload) {
    return api.post('/Task/create', payload);
  },
  async update(payload) {
    return api.put('/Task/update', payload);
  },
  async deleteById(payload) {
    return api.delete(`/Task/deleteById/${payload.Id}`);
  },
};

export const WishService = {
  async getById(payload) {
    return api.get(`/Wish/getById/${payload.Id}`);
  },
  async getByAccount(payload) {
    return api.get(`/Wish/getByAccount/${payload.AccountId}`);
  },
  async create(payload) {
    return api.post('/Wish/create', payload);
  },
  async update(payload) {
    return api.put('/Wish/update', payload);
  },
  async deleteById(payload) {
    return api.delete(`/Wish/deleteById/${payload.Id}`);
  },
};

export const GHabitService = {
  async getById(payload) {
    return api.get(`/GHabit/getById/${payload.Id}`);
  },
  async getByAccount(payload) {
    return api.get(`/GHabit/getAll/${payload.AccountId}`);
  },
  async getWithDates(payload) {
    return api.get(`/GHabit/getWithDates/${payload.AccountId}`);
  },
  async create(payload) {
    return api.post('/GHabit/create', payload);
  },
  async update(payload) {
    return api.put('/GHabit/update', payload);
  },
  async deleteById(payload) {
    return api.delete(`/GHabit/deleteById/${payload.Id}`);
  },
  async getDatesByWeek(payload) {
    return api.get(`/GHabits/date/getByWeek?id=${payload.id}`);
  },
  async getDatesByMonth(payload) {
    return api.get(
      `/GHabit/date/getByMonth?id=${payload.id}&month=${payload.month}&year=${payload.year}`,
      {
        signal: payload.signal,
      },
    );
  },
  async createDate(payload) {
    return api.post('/GHabit/date/create', payload);
  },
  async deleteDate(payload) {
    return api.delete(`/GHabit/date/delete?id=${payload.id}&date=${payload.date}`);
  },
};

export const BHabitService = {
  async getById(payload) {
    return api.get(`/BHabit/getById/${payload.Id}`);
  },
  async getByAccount(payload) {
    return api.get(`/BHabit/getAll/${payload.AccountId}`);
  },
  async create(payload) {
    return api.post('/BHabit/create', payload);
  },
  async update(payload) {
    return api.put('/BHabit/update', payload);
  },
  async deleteById(payload) {
    return api.delete(`/BHabit/deleteById/${payload.Id}`);
  },
  async getDatesByMonth(payload) {
    return api.get(
      `/BHabit/date/getByMonth?id=${payload.id}&month=${payload.month}&year=${payload.year}`,
      {
        signal: payload.signal,
      },
    );
  },
  async createDate(payload) {
    return api.post('/BHabit/date/create', payload);
  },
  async deleteDate(payload) {
    return api.delete(`/BHabit/date/delete?id=${payload.id}`);
  },
};

export const QuoteService = {
  async getRandom() {
    return api.get('/Quote/getRandom');
  },
  async getAll() {
    return api.get('/Quote/getAll');
  },
  async getRandomFromUser() {
    return api.get('/Quote/user/getRandom');
  },
  async getById(payload) {
    return api.get(`/Quote/user/getById/${payload.Id}`);
  },
  async getByAccount(payload) {
    return api.get(`/Quote/user/getAll/${payload.AccountId}`);
  },
  async create(payload) {
    return api.post('/Quote/user/create', payload);
  },
  async update(payload) {
    return api.put('/Quote/user/update', payload);
  },
  async deleteById(payload) {
    return api.delete(`/Quote/user/deleteById/${payload.Id}`);
  },
};
