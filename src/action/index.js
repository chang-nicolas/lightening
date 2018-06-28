import { observe } from 'mobx';
import { AsyncStorage, Clipboard } from 'react-native';
import { nap } from '../helper';
import store from '../store';
import GrpcAction from './grpc';
import NavAction from './nav';
import WalletAction from './wallet';
import LogAction from './log';
import InfoAction from './info';
import NotificationAction from './notification';
import ChannelAction from './channel';
import TransactionAction from './transaction';
import PaymentAction from './payment';
import InvoiceAction from './invoice';
import SettingAction from './setting';

const ipcRenderer = window.ipcRenderer; // exposed to sandbox via preload.js

//
// Inject dependencies
//

store.init();
store.restore(AsyncStorage);

export const log = new LogAction(store, ipcRenderer);
export const nav = new NavAction(store, ipcRenderer);
export const grpc = new GrpcAction(store, ipcRenderer);
export const notify = new NotificationAction(store, nav);
export const wallet = new WalletAction(store, grpc, nav, notify);
export const info = new InfoAction(store, grpc, notify);
export const channel = new ChannelAction(store, grpc, nav, notify);
export const transaction = new TransactionAction(store, grpc, wallet, nav);
export const invoice = new InvoiceAction(
  store,
  grpc,
  transaction,
  nav,
  notify,
  Clipboard
);
export const payment = new PaymentAction(store, grpc, transaction, nav, notify);
export const setting = new SettingAction(store, wallet);

//
// Init actions
//

observe(store, 'loaded', async () => {
  await grpc.initUnlocker();
});

observe(store, 'unlockerReady', async () => {
  await wallet.init();
});

observe(store, 'walletUnlocked', async () => {
  await nap();
  await grpc.closeUnlocker();
  await grpc.initLnd();
});

observe(store, 'lndReady', () => {
  info.getInfo();
  wallet.update();
  channel.update();
  transaction.update();
  transaction.subscribeTransactions();
  transaction.subscribeInvoices();
});
