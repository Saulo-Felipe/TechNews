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
import { IoNewspaperOutline } from "react-icons/io5";


function MyCustom({editorRef}: {editorRef: MutableRefObject<LexicalEditor | null>}) {
  const [editor] = useLexicalComposerContext();

  editorRef.current = editor;

  return null;
}


export default function CreateNewsPage() {
  const editorRef = useRef<LexicalEditor>(null);
  
  function handleChange(a: string) {
    // console.log("=> ", editorRef.current?.getEditorState().toJSON());

    // console.log("-> ", $generateHtmlFromNodes(JSON.parse(a), null));
  }


  return (
    <div className="relative min-h-screen">
      <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-[rgb(0,0,0,0.75)] z-40
        flex justify-center">
        <div className="bg-white rounded-md p-8 h-max relative top-[20%] text-center
          flex flex-col items-center text-2xl gap-4 w-[40%] tablet:w-[60%] smartphone:w-[90%]"
        >
            Ainda não é possível criar notícias
            <IoNewspaperOutline className="text-8xl" />
        </div>
      </div>

      <EditorComposer>
        <>
          <MyCustom editorRef={editorRef}  />

          <Editor 
            locale={"ptBr"} 
            onChange={handleChange} 
            hashtagsEnabled 
            actionsEnabled 
            emojisEnabled
          >
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
    </div>
  );
}
