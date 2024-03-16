import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    const token = localStorage.getItem('userToken');
    return {
      token,
      profile: null,
      error: null,
      waiting: false,
      isAuth: Boolean(token), // Инициализируем isAuth на основе наличия токена
    };
  }

  async logIn(login, password) {
    this.setState({ error: null , waiting: true});

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      localStorage.setItem('userToken', data.result.token);

      this.setState({
        token: data.result.token,
        profile: { ...data.result.user.profile, email: data.result.user.email },
        isAuth: true,
        waiting: false
      });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      this.setState({ error: error.message || 'Не удалось выполнить вход', waiting: false });
    }
  }

  async logOut() {
    try {
      const token = this.getState().token;
      if (token) {
        await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: { 'X-Token': token, 'Content-Type': 'application/json' },
        });
        localStorage.removeItem('userToken');
      }

      this.setState({ token: null, profile: null, isAuth: false });
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  }

  async getProfile() {
    this.setState({ error: null , waiting: true});

    try {
      const token = this.getState().token;
      if (!token) {
        throw new Error('Токен пользователя отсутствует');
      }

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: { 'X-Token': token, 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      this.setState({
        profile: { ...data.result.profile, email: data.result.email },
        isAuth: true,
        waiting: false
      });
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      this.setState({ error: error.message || 'Не удалось загрузить профиль', waiting: false });
    }
  }
}

export default AuthState;
