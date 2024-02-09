import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";
export default function RightSide() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  // 完成！
  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }
  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
}
