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

import { Button } from "@/components/Button"; // @lexical/react/LexicalComposerContext
import {useLexicalComposerContext} from "verbum/node_modules/@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "verbum/node_modules/@lexical/html";
import { useRef, MutableRefObject, useEffect } from "react";
import { LexicalEditor } from "verbum/node_modules/lexical";


function MyCustom({editorRef}: {editorRef: MutableRefObject<LexicalEditor | null>}) {
  const [editor] = useLexicalComposerContext();

  editorRef.current = editor;

  return null;
}

export default function NoteViewer() {
  const editorRef = useRef<LexicalEditor>(null);


  function handleClick() {
    // const data = editorRef.current?.getEditorState();
    console.log(editorRef.current);
    const data = `<h1 class="PlaygroundEditorTheme__h1"><span>Lorem Ipsum</span></h1>
    <h4 class="PlaygroundEditorTheme__h4"><span>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..."</span></h4>
    <h5 class="PlaygroundEditorTheme__h5"><span>"There is no one who loves pain itself, who seeks after it and wants to have
        it, simply because it is pain..."</span></h5>
    <hr>
    <h2 class="PlaygroundEditorTheme__h2"><span>What is Lorem Ipsum?</span></h2>
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: justify;"><b><strong
          class="PlaygroundEditorTheme__textBold">Lorem Ipsum</strong></b><span>&nbsp;is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
    <h2 class="PlaygroundEditorTheme__h2"><span>Why do we use it?</span></h2>
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: justify;"><span>It is a long established fact
        that a reader will be distracted by the readable content of a page when looking at its layout. The point of using
        Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem
        Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour
        and the like).</span></p>
    <p class="PlaygroundEditorTheme__paragraph"><span class="editor-image"></span></p>
    <div></div>
    <p class="PlaygroundEditorTheme__paragraph"><br></p>
    <h2 class="PlaygroundEditorTheme__h2"><span>Where does it come from?</span></h2>
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: justify;"><span>Contrary to popular belief,
        Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
        the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
        classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
        Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
        the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
        amet..", comes from a line in section 1.10.32.</span></p>
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: justify;"><span>The standard chunk of Lorem
        Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
        Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from
        the 1914 translation by H. Rackham.</span></p>
    <h2 class="PlaygroundEditorTheme__h2"><span>Where can I get some?</span></h2>
    <p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: justify;"><span>There are many variations of
        passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
        need to be sure there isn't anything embarrassing hidden in the middle of text. All the</span><span
        style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">f</span><span> Lorem Ipsum generators on the
        Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It
        uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem
        Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour,
        or non-characteristic words etc.</span></p>
    <table class="PlaygroundEditorTheme__table">
      <colgroup>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <tbody>
        <tr>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 175px; vertical-align: top; text-align: start;"></td>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 175px; vertical-align: top; text-align: start;">
            <table class="PlaygroundEditorTheme__table">
              <colgroup>
                <col>
                <col>
              </colgroup>
              <tbody>
                <tr>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;">
                    <span>paragraphs</span></td>
                </tr>
                <tr>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;">
                    <span>words</span></td>
                </tr>
                <tr>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;">
                    <span>bytes</span></td>
                </tr>
                <tr>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
                  <td class="PlaygroundEditorTheme__tableCell"
                    style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;">
                    <span>lists</span></td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 175px; vertical-align: top; text-align: start;"></td>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 175px; vertical-align: top; text-align: start;"><span>Start with
              'Lorem</span><br><span>ipsum dolor sit amet...'</span></td>
        </tr>
        <tr>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
          <td class="PlaygroundEditorTheme__tableCell"
            style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"></td>
        </tr>
      </tbody>
    </table>`;
    const parser = new DOMParser();
    const dom = parser.parseFromString(data, "text/html");
    const response = $generateNodesFromDOM(editorRef.current as LexicalEditor, HTMLpars(dom));

    console.log(String(dom));
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.registerUpdateListener(
        ({ editorState }) => {
          editorState.read(() => {
            // const htmlString = $generateHtmlFromNodes(editorRef.current as LexicalEditor, null);
            // console.log("myhtml: ", htmlString);
          });
        }
      );
    }
  }, [editorRef]);


  return (
    <EditorComposer>
      <div onClick={handleClick}>
        <MyCustom editorRef={editorRef} />
        <Editor locale={"ptBr"} hashtagsEnabled actionsEnabled emojisEnabled >
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
      </div>
    </EditorComposer>
  );
}
