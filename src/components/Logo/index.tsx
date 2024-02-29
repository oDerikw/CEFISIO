import { Box, styled } from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
        &:hover {
          text-decoration: none;
        }
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 100%;
        display:flex;
        align-itens:center;
        height: -webkit-fill-available;
`
);

function Logo() {
  return (
    <LogoWrapper href="/">
      <LogoSignWrapper>
      <img alt="CEFISIO" src='/whitelogo.png' />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
