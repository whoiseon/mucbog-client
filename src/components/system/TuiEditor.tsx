import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';
import useIsMobile from '@/lib/hooks/useIsMobile';

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
  onChange: () => void;
}

function TuiEditor({ content, editorRef, onChange }: Props) {
  const [isMobile, mediaLoading] = useIsMobile();

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote', 'link', 'image', 'code'],
  ];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          onChange={onChange}
          initialValue={content || ''}
          initialEditType="markdown"
          previewStyle={isMobile ? 'tab' : 'vertical'}
          hideModeSwitch={true}
          height="calc(100% - 120px)"
          usageStatistics={false}
          toolbarItems={toolbarItems}
          language="ko-KR"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
    </>
  );
}

export default TuiEditor;
