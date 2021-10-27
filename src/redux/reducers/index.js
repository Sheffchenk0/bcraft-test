import { API } from '../../API';

const SET_DEFAULT_VALUE = 'SET_DEFAULT_VALUE';
const SET_AUTH = 'SET_AUTH';
const SET_NOTIFICATION = 'SET_NOTIFICATION';

const initialState = {
  auth: {
    isAuth: false,
    email: null,
    password: null,
  },
  pages: [
    { value: 'Log In', href: '/bcraft-test/login', auth: false },
    { value: 'Sign Up', href: '/bcraft-test/signup', auth: false },
    { value: 'Change password', href: '/bcraft-test/change', auth: true },
    { value: 'Log Out', href: '/bcraft-test/ogout', auth: true },
  ],
  notification: null,
  loginPageForm: [
    {
      id: 0,
      inputType: 'text',
      validation: {
        required: 'Please enter your email.',
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 100',
        },
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Entered value does not match email format',
        },
      },
      suggested: 'email',
      placeholder: 'Email...',
      name: 'email',
      label: 'E-mail',
      defaultValue: '',
    },
    {
      id: 1,
      inputType: 'password',
      validation: {
        required: 'Please enter your password.',
        pattern: {
          value: /[A-Z]/,
          message: 'Password must have at least one capital letter',
        },
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 100',
        },
      },
      placeholder: 'Password...',
      name: 'password',
      label: 'Password',
      defaultValue: '',
    },
  ],
  signupPageForm: [
    {
      id: 0,
      inputType: 'text',
      validation: {
        required: 'Please enter your E-mail.',
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 100',
        },
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Entered value does not match email format',
        },
      },
      placeholder: 'Email...',
      name: 'email',
      label: 'E-mail',
      defaultValue: '',
    },
    {
      id: 1,
      inputType: 'password',
      validation: {
        required: 'Please enter your password.',
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 100',
        },
        pattern: {
          value: /[A-Z]/,
          message: 'Password must have at least one capital letter',
        },
      },
      placeholder: 'Password...',
      name: 'password',
      label: 'Password',
      defaultValue: '',
    },
    {
      id: 2,
      inputType: 'password',
      watch: 'password',
      type: 1,
      validation: {
        createValidate: (password) => {
          return {
            pattern: {
              value: /[A-Z]/,
              message: 'Password must have at least one capital letter',
            },
            required: 'Please enter your password.',
            validate: (value) => value === password || 'The passwords do not match',
          };
        },
      },
      placeholder: '...',
      name: 'repeat',
      label: 'Repeat password',
      defaultValue: '',
    },
  ],
  changePasswordForm: [
    {
      id: 0,
      inputType: 'password',
      validation: {
        required: 'Please enter your old password.',
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 10',
        },
        pattern: {
          value: /[A-Z]/,
          message: 'Password must have at least one capital letter',
        },
      },
      placeholder: 'Old password...',
      name: 'oldPassword',
      label: 'Enter old password',
      defaultValue: '',
    },
    {
      id: 1,
      inputType: 'password',
      validation: {
        required: 'Please enter your password.',
        minLength: {
          value: 4,
          message: 'Min length is 4',
        },
        maxLength: {
          value: 100,
          message: 'Max length is 100',
        },
        pattern: {
          value: /[A-Z]/,
          message: 'Password must have at least one capital letter',
        },
      },
      placeholder: 'Password...',
      name: 'password',
      label: 'Enter new password',
      defaultValue: '',
    },
    {
      id: 2,
      inputType: 'password',
      watch: 'password',
      type: 1,
      validation: {
        createValidate: (password) => {
          return {
            pattern: {
              value: /[A-Z]/,
              message: 'Password must have at least one capital letter',
            },
            required: 'Please enter your password.',
            validate: (value) => value === password || 'The passwords do not match',
          };
        },
      },
      placeholder: '...',
      name: 'newPassword',
      label: 'Confirm new password',
      defaultValue: '',
    },
  ],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DEFAULT_VALUE:
      let result = [...state[payload.name]];
      result = result.map((el) => {
        return { ...el, defaultValue: payload.values[el.name] };
      });
      return { ...state, [payload.name]: result };
    case SET_AUTH: {
      return {
        ...state,
        auth: {
          ...payload,
        },
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...state,
        notification: { ...payload },
      };
    }
    default:
      return state;
  }
}

export const setDefaultValueAC = (name, values) => {
  return { type: SET_DEFAULT_VALUE, payload: { name, values } };
};
export const setAuth = (isAuth, email = null, password = null) => {
  return { type: SET_AUTH, payload: { email, password, isAuth } };
};
export const setNotification = (notification) => {
  return { type: SET_NOTIFICATION, payload: notification };
};
export const setWrongAC = () => {
  return { type: SET_NOTIFICATION, payload: { message: 'Something went wrong', isError: true } };
};

export const login = (email, password, message, isError) => {
  return (dispatch) => {
    API.login(email, password)
      .then((res) => {
        if (res.data.result === 200) {
          dispatch(setAuth(true, email, password));
          dispatch(addNotification(message, isError));
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const changePassword = (email, newPassword, message, isError) => {
  return (dispatch) => {
    API.changePassword(email, newPassword)
      .then((res) => {
        if (res.data.result === 200) {
          dispatch(setAuth(true, email, newPassword));
          dispatch(addNotification(message, isError));
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const signUp = (email, password, message, isError) => {
  return (dispatch) => {
    API.signup(email, password)
      .then((res) => {
        if (res.data.result === 200) {
          dispatch(setAuth(true, email, password));
          dispatch(addNotification(message, isError));
        }
      })
      .catch(() => {
        dispatch(setWrong());
      });
  };
};

export const setDefaultValue = (name, values) => {
  return (dispatch) => {
    if (Object.keys(values).length === 0) {
      return false;
    }
    dispatch(setDefaultValueAC(name, values));
  };
};

export const addNotification = (message, isError) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);
  };
};

export const setWrong = () => {
  return (dispatch) => {
    dispatch(setWrongAC());
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);
  };
};
