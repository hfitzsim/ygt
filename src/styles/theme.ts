import { createTheme } from '@mantine/core';

const theme = createTheme({
    colors: {
        jet: [
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
            '#363635',
        ],
        'cherry-blossom-pink': [
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
            '#FBB1C6',
        ],
    },
    primaryColor: 'jet',
    primaryShade: 5,
    autoContrast: true,
    luminanceThreshold: 0.3,
    defaultRadius: 0,
});

export default theme;
