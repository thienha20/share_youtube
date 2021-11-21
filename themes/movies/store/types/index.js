import * as commons from './commons';
import * as payments from './payments';
import * as sms from './sms';
import * as sap from './sap';
import * as users from './users';
import * as auth from './auth';
import * as settings from './settings';

const types = {
    ...commons,
    ...payments,
    ...sms,
    ...sap,
    ...users,
    ...auth,
    ...settings,
};
export default types