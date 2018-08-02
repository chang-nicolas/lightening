/**
 * @fileOverview actions to handle settings state and save persist
 * them to disk when they are updated by the user.
 */

import { UNITS, FIATS } from '../config';
import LocaleCurrency from 'locale-currency';
import { DEFAULT_FIAT } from '../config';

class SettingAction {
  constructor(store, wallet, db) {
    this._store = store;
    this._wallet = wallet;
    this._db = db;
  }

  /**
   * Set the bitcoin unit that is to be displayed in the UI and
   * perist the updated settings to disk.
   * @param {string} options.unit The bitcoin unit e.g. `btc`
   */
  setBitcoinUnit({ unit }) {
    if (!UNITS[unit]) {
      throw new Error(`Invalid bitcoin unit: ${unit}`);
    }
    this._store.settings.unit = unit;
    this._db.save();
  }

  /**
   * Set the fiat currency that is to be displayed in the UI and
   * perist the updated settings to disk.
   * @param {string} options.fiat The fiat currency e.g. `usd`
   */
  setFiatCurrency({ fiat }) {
    let fiatSetting = fiat;
    if (!FIATS[fiat]) {
      fiatSetting = DEFAULT_FIAT;
      // throw new Error(`Invalid fiat currency: ${fiat}`);
    }
    this._store.settings.fiat = fiatSetting;
    this._wallet.getExchangeRate();
    this._db.save();
  }
  setFiatByLocale({ locale }) {
    const fiat = LocaleCurrency.getCurrency(locale).toLowerCase();
    this.setFiatCurrency({ fiat });
  }
}

export default SettingAction;
