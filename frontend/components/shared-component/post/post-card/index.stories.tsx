import React from "react";
import PostCard, { PostProps } from ".";

export default {
  component: PostCard,
  title: "PostCard",
}

const initInitialState = {
      id: 1,
      title: "post title here",
      author: {
        name: "author name here"
      },
      content: "post content here",
      published: false
}


const Template = (args: PostProps) => {
  return (
    <PostCard post={{...args}}/>
  )
}

export const Default = Template.bind({})
Default.args = {
  ...initInitialState
}