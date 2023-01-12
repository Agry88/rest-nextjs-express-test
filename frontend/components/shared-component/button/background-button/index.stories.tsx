import React from "react";
import BackgroundButton from ".";

export default {
  component: BackgroundButton,
  title: "BackgroundButton",
};

const Template = (args: { string: string }) => {
  return (
    <BackgroundButton>
      {args.string}
    </BackgroundButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  string: "button text here"
}