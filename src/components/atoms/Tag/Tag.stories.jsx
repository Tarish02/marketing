import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Tag from "./Tag";

export default {
  title: "Atoms/Tag",
  component: Tag,
  argTypes: {
    label: { control: "text" },
    to: { control: "text" },
  },
};

const Template = (args) => (
  <Router>
    <Tag {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  label: "Example Link",
  to: "/example",
};
