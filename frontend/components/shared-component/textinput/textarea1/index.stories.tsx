import React from "react";
import TextArea from ".";

export default {
  component: TextArea,
  title: "TextArea1",
  excludeStories: /.*Data$/,
};

const Template = () => {
  return <TextArea/> ;
};

export const Default = Template.bind({});

