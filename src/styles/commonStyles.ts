import { createStyles, rem } from '@mantine/core'



export const useStyles = createStyles((theme) => ({
    app: {
        position: 'relative',
        backgroundColor: '#F5F5F5',
        width: '100%',
        minHeight: '100vh',
        fontFamily: 'Inter'
    },
    pageContainer: {

        minHeight: 'calc(100vh - 84px)',
        // backgroundColor: 'rgba(161,132,210,0.61)',
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
        // backgroundColor: '#9146ff'
        // height: '100%'
        // width: '100%',
    },

    page: {}
}))