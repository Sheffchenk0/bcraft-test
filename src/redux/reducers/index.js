import { API } from '../../API';

const SET_DEFAULT_VALUE = 'SET_DEFAULT_VALUE';
const SET_AUTH = 'SET_AUTH';

const initialState = {
  auth: {
    isAuth: false,
    email: null,
    password: null,
  },
  pages: [
    { value: 'Log In', href: '/login', auth: false },
    { value: 'Sign In', href: '/signin', auth: false },
    { value: 'Change password', href: '/change', auth: true },
    { value: 'Log Out', href: '/logout', auth: true },
  ],
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
  signinPageForm: [
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

export default (state = initialState, { type, payload }) => {
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
    default:
      return state;
  }
};

export const setDefaultValue = (name, values) => {
  return { type: SET_DEFAULT_VALUE, payload: { name, values } };
};
export const setAuth = (isAuth, email = null, password = null) => {
  return { type: SET_AUTH, payload: { email, password, isAuth } };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    API.login(email, password).then((res) => {
      if (res.data.result === 200) {
        dispatch(setAuth(true, email, password));
      }
    });
  };
};
