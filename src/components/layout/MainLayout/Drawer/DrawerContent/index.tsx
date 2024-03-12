// project import
import { SideBarMenuEnum } from '../../../MainLayout';
import Navigation from './Navigation';
import SimpleBar from 'src/components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //
interface Props {
  sideBarMenuType: SideBarMenuEnum;
}

const DrawerContent = ({ sideBarMenuType }: Props) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation sideBarMenuType={sideBarMenuType} />
  </SimpleBar>
);

export default DrawerContent;
