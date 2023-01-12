import React from "react";
import TextInput from ".";

export default {
  component: TextInput,
  title: "TextInput1",
  excludeStories: /.*Data$/,
};

const Template = () => {
  return <TextInput/> ;
};

export const Default = Template.bind({});

