import React from "react";
import CategoryItem, { Props } from ".";

export default {
  component: CategoryItem,
  title: "CategoryItem",
}

const Template = (args: Props) => {
  return (
    <CategoryItem href={args.href} name={args.name} />
  )
}

export const Default = Template.bind({})
Default.args = {
  href: "/",
  name: "category name here"
}