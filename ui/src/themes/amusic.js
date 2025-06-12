import red from '@material-ui/core/colors/red'
import stylesheet from './amusic.css.js'

export default {
  themeName: 'Amusic',
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: red,
    type: 'dark',
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple Color Emoji', 'SF Pro', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    h6: {
      fontSize: '1rem', // AppBar title
    }, 
    h5: {
      fontSize: '2rem', // Artist title
      fontWeight: 700,
    },
  },
  overrides: {
    MuiFormGroup: {
      root: {
        color: 'white',
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#FF4E6B',
      },
    },
    NDAlbumDetails: {
      root: {
        background: 'linear-gradient(#1d1d1d, transparent)',
        borderRadius: 0,
        boxShadow: 'none',
      },
      cardContents: {
        alignItems: 'center',
        paddingTop: '1.5rem',
      },
      recordName: {
        fontSize: 'calc(1rem + 1.5vw);',
        fontWeight: 700,
      },
      recordArtist: {
        fontSize: '.875rem',
        fontWeight: 700,
      },
      recordMeta: {
        fontSize: '.875rem',
        color: 'rgba(255,255,255, 0.8)',
      },
    },
    
    NDAlbumGridView: {
      albumName: {
        marginTop: '0.5rem',
        fontSize: '0.8em',
        textTransform: 'none',
        color: '#fff',
      },
      albumSubtitle: {
        fontSize: '0.8em',
        color: '#b3b3b3',
      },
      albumPlayButton: {
        backgroundColor: 'rgba(40,40,40 / 50%)',
        borderRadius: '50%',
        boxShadow: '0 2px 10px rgba(0,0,0 / 20%)',
        padding: '0.35rem',
        transition: 'padding .3s ease',
        '&:hover': {
          background: '#FF4E6B !important',
          padding: '0.45rem',
        },
      },
    },
    NDLogin: {
      systemNameLink: {
        color: '#0085ff',
      },
      icon: {},
      welcome: {
        color: '#eee',
      },
      card: {
        minWidth: 300,
        backgroundColor: '#424242ed',
      },
      avatar: {},
      button: {
        boxShadow: '3px 3px 5px #000000a3',
      },
    },
    NDMobileArtistDetails: {
      bgContainer: {
        background:
          'linear-gradient(to bottom, rgba(52 52 52 / 72%), rgb(48 48 48))!important',
      },
    },
    NDCoverArt: {
      root: {
        borderRadius: '7px',
      },
    },
    NDPlaylistImage: {
      root: {
        borderRadius: '7px',
      },
    },
  },
  player: {
    theme: 'dark',
    stylesheet,
  },
}