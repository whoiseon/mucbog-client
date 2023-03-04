import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import React from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor } from '@toast-ui/react-editor';
import {useTheme} from "@/lib/hooks/useTheme";
import useIsMobile from "@/lib/hooks/useIsMobile";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

function TuiEditor({ content = '', editorRef }: Props) {
  const theme = useTheme();
  const [isMobile, mediaLoading] = useIsMobile();

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  console.log(theme);
  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ''}
          initialEditType="markdown"
          previewStyle={isMobile ? 'tab' : 'vertical'}
          hideModeSwitch={true}
          height="100%"
          theme={theme === 'dark' ? 'dark' : ''}
          usageStatistics={false}
          toolbarItems={toolbarItems}
          language="ko-KR"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
    </>
  )
}

export default TuiEditor;
