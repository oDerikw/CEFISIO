import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const { t }: { t: any } = useTranslation();

  return (
    <TooltipWrapper title={t('Logo')} arrow>
          <img height={100} alt="Logo" src='/whitelogo.png' />
    </TooltipWrapper>
  );
}

export default Logo;
