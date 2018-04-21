import * as log from './log';

class NavAction {
  constructor(store, invoice, ipcRenderer) {
    this._store = store;
    this._invoice = invoice;
    ipcRenderer.on('open-url', (event, arg) => {
      // TODO: Go to route
      log.info('open-url', arg);
    });
  }

  goHome() {
    this._store.route = 'Home';
  }

  goPay() {
    this._store.route = 'Pay';
  }

  goRequest({ keepState } = {}) {
    if (!keepState) this._invoice.clear();
    this._store.route = 'Request';
  }

  async goRequestQR() {
    await this._invoice.generateUri();
    this._store.route = 'RequestQR';
  }

  goChannels() {
    this._store.route = 'Channels';
  }

  goTransactions() {
    this._store.route = 'Transactions';
  }

  goTransaction() {
    this._store.route = 'Transaction';
  }

  goSettings() {
    this._store.route = 'Settings';
  }

  goCreateChannel() {
    this._store.route = 'CreateChannel';
  }

  goInitializeWallet() {
    this._store.route = 'InitializeWallet';
  }

  goVerifyWallet() {
    this._store.route = 'VerifyWallet';
  }

  goFundWallet() {
    this._store.route = 'FundWallet';
  }
}

export default NavAction;
