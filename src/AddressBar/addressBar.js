// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, DappUrlInput } from '@parity/ui';
import { CloseIcon, RefreshIcon, GotoIcon } from '@parity/ui/lib/Icons';

@observer
export default class AddressBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    store: PropTypes.object.isRequired
  };

  render () {
    const { isLoading, isPristine, nextUrl } = this.props.store;

    return (
      <div className={ this.props.className }>
        <Button
          disabled={ isLoading }
          onClick={ this.onRefreshUrl }
          icon={
            isLoading
              ? <CloseIcon />
              : <RefreshIcon />
          }
        />
        <DappUrlInput
          onChange={ this.onChangeUrl }
          onGoto={ this.onGotoUrl }
          onRestore={ this.onRestoreUrl }
          url={ nextUrl }
        />
        <Button
          disabled={ isPristine }
          onClick={ this.onGotoUrl }
          icon={ <GotoIcon /> }
        />
      </div>
    );
  }

  onRefreshUrl = () => {
    this.props.store.reload();
  }

  onChangeUrl = (url) => {
    this.props.store.setNextUrl(url);
  }

  onGotoUrl = () => {
    this.props.store.gotoUrl();
  }

  onRestoreUrl = () => {
    this.props.store.restoreUrl();
  }
}
