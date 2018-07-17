import React, { Component } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../../src/component/button';
import { H4Text } from './text';
import Icon from './icon';
import { color } from './style';

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: color.whiteBg,
    width: 430,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    color: color.blackText,
    marginBottom: 10,
  },
  cancelBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 52,
    minHeight: 52,
  },
  cancelIcon: {
    height: 12,
    width: 12,
  },
});

class Modal extends Component {
  constructor(props) {
    props.title = props.title || '';
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  }

  render() {
    const { title, style, onClose, children } = this.props;
    return (
      <View style={[styles.modal, style]}>
        <H4Text style={styles.title}>{title.toUpperCase()}</H4Text>
        <Button style={styles.cancelBtn} onPress={onClose}>
          <Icon image="cancel-grey" style={styles.cancelIcon} />
        </Button>
        {children}
      </View>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default Modal;
