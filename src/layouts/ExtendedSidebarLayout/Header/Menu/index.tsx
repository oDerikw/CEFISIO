import {
  Box,
  List,
  ListItem,
  ListItemText,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import Link from 'src/components/Link';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <ListWrapper>
        <List disablePadding component={Box} display="flex">
          <ListItem component={Link} href="/dashboards/main" classes={{ root: 'MuiListItem-indicators' }} button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Início')}
            />
          </ListItem>
          <ListItem component={Link} href="/management/users"  classes={{ root: 'MuiListItem-indicators' }} button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Usuários')}
            />
          </ListItem>
          <ListItem component={Link} href="/"  classes={{ root: 'MuiListItem-indicators' }} button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={t('Calendário')}
            />
          </ListItem>

        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
