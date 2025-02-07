import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select", options: ["login", "signup", "logout"] },
    },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Login = Template.bind({});
Login.args = {
  label: "Login",
  variant: "login",
};

export const Signup = Template.bind({});
Signup.args = {
  label: "Sign Up",
  variant: "signup",
};

export const Logout = Template.bind({});
Logout.args = {
  label: "Logout",
  variant: "logout",
};
