import { UserRole } from '../../modules/auth/models';

export interface Menu {
  name: string;
  iconClass: string;
  iconPath?: string;
  iconName?: string;
  url: string;
  roles?: UserRole[];
}

export { UserRole };
