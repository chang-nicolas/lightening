/**
 * @fileOverview computed values that are used in wallet UI components.
 */

import { extendObservable } from 'mobx';
import { toAmountLabel } from '../helper';
import {
  UNITS,
  FIATS,
  MIN_PASSWORD_LENGTH,
  STRONG_PASSWORD_LENGTH,
} from '../config';

const ComputedWallet = store => {
  extendObservable(store, {
    get walletAddressUri() {
      return store.walletAddress ? `bitcoin:${store.walletAddress}` : '';
    },
    get depositLabel() {
      const { balanceSatoshis, pendingBalanceSatoshis, settings } = store;
      return toAmountLabel(balanceSatoshis + pendingBalanceSatoshis, settings);
    },
    get totalBalanceLabel() {
      const {
        balanceSatoshis,
        pendingBalanceSatoshis,
        channelBalanceSatoshis,
        settings,
      } = store;
      return toAmountLabel(
        balanceSatoshis + pendingBalanceSatoshis + channelBalanceSatoshis,
        settings
      );
    },
    get unitFiatLabel() {
      const { displayFiat, unit, fiat } = store.settings;
      return displayFiat ? FIATS[fiat].display : UNITS[unit].display;
    },
    get unitLabel() {
      const { settings } = store;
      return !settings.displayFiat ? UNITS[settings.unit].display : null;
    },
    get newPasswordCopy() {
      const { newPassword } = store.wallet;
      return getNewPasswordCopy({ newPassword });
    },
    get newPasswordSuccess() {
      const { newPassword } = store.wallet;
      if (!newPassword) {
        return null;
      }
      return newPassword.length >= MIN_PASSWORD_LENGTH;
    },
  });
};

/**
 * If necessary, return copy advising the user on the quality of their password.
 * @param  {string} options.walletPassword The password used to encrypt the wallet
 * @return {string}
 */
const getNewPasswordCopy = ({ newPassword }) => {
  if (newPassword.length >= STRONG_PASSWORD_LENGTH) {
    return "Now that's a strong password!";
  } else if (newPassword.length >= MIN_PASSWORD_LENGTH) {
    return 'Pro tip: add a few more characters to strengthen your password.';
  }
  return '';
};

export default ComputedWallet;
