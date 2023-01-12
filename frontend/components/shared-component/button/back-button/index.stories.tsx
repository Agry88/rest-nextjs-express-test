import React from "react";
import BackButton from ".";

export default {
  component: BackButton,
  title: "BackButton",
};

const Template = (args: { string: string, href: string }) => { 
  return (
    <BackButton href={args.href}>
      {args.string}
    </BackButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  string: "button text here",
  href: "/",
}