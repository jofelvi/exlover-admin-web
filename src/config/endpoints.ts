const endPoints = {
  auth: {
    login: `Users/login`,
    signUp: `identity/register`,
    createUser: `Users/CreateUser`,
    forgotPassword: `Users/forgot-password`,
    confirmResetPassword: `Users/ConfirmResetPassword`,
    verifyEmail: (userId: string | undefined, token: string | undefined) =>
      `Users/ConfirmEmail?userId=${userId}&token=${token}`,
    getInfoUser: (userId: string) => `Users/GetInfoUser?Id=${userId}`,
  },
  notifications: {
    getAll: "Administrador/Notificaciones",
    add: "Administrador/NotificacionesCreate",
    update: "Administrador/Notificaciones/Modify",
    delete: (id: string) => `Administrador/Notificaciones/Delete/${id}`,
  },
  category: {
    getAll: "Product/GetAllCategory",
    add: "Product/AddCategory",
  },
  meditations: {
    getAll: "Administrador/MeditacionesGetAll",
    getAllCategories: "Administrador/GetListMeditations",
    add: "Administrador/MeditacionesCreate",
    update: "Administrador/MeditacionesActualizar",
    delete: (id: string) => `Administrador/MeditacionesEliminar/${id}`,
  },
  sleep: {
    getAll: "Administrador/Duerme",
    add: "Administrador/DuermeCreateAsync",
  },
  sound: {
    getAll: "Administrador/Sonidos",
    add: "Administrador/SonidosCreate",
  },
  dashboard: {
    getAll: "Administrador/Dashboard",
  },
  user: {
    getAll: "Administrador/Usuarios",
    add: "Administrador/DuermeCreateAsync",
    getUserById: "Administrador/DuermeCreateAsync",
  },
};

export default endPoints;
