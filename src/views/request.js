import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Text, TextB } from '../components/text';
import TextInput from '../components/textinput';
import Button from '../components/button';
import { Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import QRCode from '../components/qrcode';
import ComponentIcon from '../components/icon';
import { colors } from '../styles';
import store from '../store';

class Request extends Component {
  constructor() {
    super();

    this.state = {
      showQR: false,
      amount: '',
      note: '',
    };
  }

  render() {
    const { showQR, amount, note } = this.state;
    const { walletAddress } = store;

    return (
      <View style={{ flex: 1, backgroundColor: colors.offwhite }}>
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ color: colors.gray, fontSize: 24, marginBottom: 14 }}>
            Request Lightning Payment
          </Text>
          <Text style={{ color: colors.lightgray }}>
            Generate a payment request that others can use to pay you
            immediately via the Lightning Network
          </Text>

          <TextInput
            rightText="SAT"
            placeholder="Amount"
            value={amount}
            onChangeText={amount =>
              this.setState({ amount: amount.replace(/[^0-9.]/g, '') })
            }
          />
          <TextInput
            placeholder="Note"
            value={note}
            onChangeText={note => this.setState({ note })}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 4,
              marginTop: 12,
            }}
          >
            <Button
              disabled={!amount}
              text="Generate Payment Request"
              onPress={() => {}}
            />

            {(!!amount || !!note) && (
              <TouchableOpacity
                style={{}}
                onPress={() => this.setState({ amount: '', note: '' })}
              >
                <Text
                  style={{ color: colors.lightgray, margin: 14, fontSize: 16 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: colors.lightergray,
            }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 14,
                margin: 4,
                marginTop: 20,
                shadowRadius: 4,
                shadowOpacity: 0.3,
                shadowColor: 'black',
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colors.gray,
                  userSelect: 'none',
                  cursor: 'default',
                }}
              >
                Wallet Address
              </Text>
              <View
                style={{
                  width: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: colors.lightergray,
                }}
              />
              {walletAddress ? (
                <Text style={{ fontSize: 15 }}>{walletAddress}</Text>
              ) : (
                <ActivityIndicator />
              )}
            </View>

            {walletAddress && (
              <TouchableOpacity
                style={{}}
                onPress={() => this.setState({ showQR: true })}
              >
                <ComponentIcon
                  icon="qrcode"
                  style={{
                    margin: 10,
                    marginTop: 22,
                    width: 28,
                    height: 28,
                    color: colors.gray,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showQR && (
          <TouchableOpacity
            onPress={() => this.setState({ showQR: false })}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(1,1,1,0.3)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ width: 300, height: 300, backgroundColor: 'white' }}>
              <QRCode address={walletAddress} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default observer(Request);
