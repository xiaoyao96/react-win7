import * as React from 'react';

import loadable from '@loadable/component';

export default (name, data) => {
    const AsyncPage = loadable(() => import(`../myApp/${name}`));

    return class extends React.Component {
        render() {
            return (
                <AsyncPage {...data} />
            );
        }
    };
};