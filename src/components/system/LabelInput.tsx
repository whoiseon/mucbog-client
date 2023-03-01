import Input, { InputProps } from '@/components/system/Input';
import styled from '@emotion/styled';
import { themedPalette } from '@/styles/palette';

interface Props extends InputProps {
  label: string;
}

function LabelInput({ label, ...rest }: Props) {
  return (
    <Block>
      <label>{label}</label>
      <Input {...rest} />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 16px;
    line-height: 1.5;
    color: ${themedPalette.text2};
    font-weight: 700;
    margin-bottom: 4px;
  }
`;

export default LabelInput;
