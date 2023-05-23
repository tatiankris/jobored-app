import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
    app: {
        position: 'relative',
        backgroundColor: '#F5F5F5',
        width: '100%',
        minHeight: '100vh',
        fontFamily: 'Inter'
    },
    pageContainer: {
        minHeight: 'calc(100vh - 84px)',
        position: 'relative',
        paddingTop: '40px',
        paddingBottom: '44px'
    },
    containerHeader: {
        height: '100%'
    },
    container: {
        position: 'relative',
        minHeight: 'calc(100vh - 168px)'
    }
}))