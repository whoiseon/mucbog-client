import styled from "@emotion/styled";
import {useRef} from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/system/TuiEditor'), { ssr: false });

function WriteForm () {
  const editorRef = useRef<any>(null);
  return <StyledForm>
    <input type="text" />
    <Editor content="" editorRef={editorRef} />
  </StyledForm>
}

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`

export default WriteForm;
