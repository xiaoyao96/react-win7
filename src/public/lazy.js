import * as React from 'react';

import loadable from '@loadable/component';

export default (com, data) => {
    const AsyncPage = loadable(com);

    return class extends React.Component {
        render() {
            return (
                <AsyncPage {...data} />
            );
        }
    };
};