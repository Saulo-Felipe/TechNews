"use client";

import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from "verbum";

import { Button } from "@/components/Button";
import { useLexicalComposerContext } from "verbum/node_modules/@lexical/react/LexicalComposerContext";
import { useRef, MutableRefObject } from "react";
import { LexicalEditor } from "verbum/node_modules/lexical";

function MyCustom({editorRef}: {editorRef: MutableRefObject<LexicalEditor | null>}) {
  const [editor] = useLexicalComposerContext();

  editorRef.current = editor;

  return null;
}


export default function NoteViewer() {
  const editorRef = useRef<LexicalEditor>(null);
  function handleChange(a: string) {
    console.log(a);
  }

  return (
    <EditorComposer>
      <>
        <MyCustom editorRef={editorRef}  />
        <Editor locale={"ptBr"} onChange={handleChange} hashtagsEnabled actionsEnabled emojisEnabled >
          <ToolbarPlugin defaultFontSize="20px">
            <FontFamilyDropdown />
            <FontSizeDropdown />
            <Divider />
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <CodeFormatButton />
            <InsertLinkButton />
            <TextColorPicker />
            <BackgroundColorPicker />
            <TextFormatDropdown />
            <Divider />
            <InsertDropdown enableYoutube enablePoll enableImage  />
            <Divider />
            <AlignDropdown />
          </ToolbarPlugin>
        </Editor>
          
        <div className="flex justify-end my-6">
          <Button>Publicar</Button>
        </div>
      </>
    </EditorComposer>
  );
}
