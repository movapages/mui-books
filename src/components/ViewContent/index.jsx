import React, { useRef, useState, useEffect } from 'react';
import {Editor} from "@monaco-editor/react";

export default function ViewContent() {

  const defaultValue = `// comments go here
  
  function justDoIt(args) {
    console.log(JSON.stringify(args, null, 2));
    }`;

  console.log(JSON.stringify(defaultValue, null, 2));

  return <Editor height="90vh" defaultLanguage="javascript" defaultValue={defaultValue}/>;
}