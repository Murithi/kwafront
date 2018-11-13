import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { stateOptions } from '../common';
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const DropDownSearchSelection = () => <Dropdown placeholder="State" search selection options={stateOptions} />;

export default DropDownSearchSelection;
