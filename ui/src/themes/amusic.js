import red from '@material-ui/core/colors/red'
import stylesheet from './amusic.css.js'

export default {
  themeName: 'Amusic',
  palette: {
    primary: {
      main: '#FF4E6B',
    },
    secondary: {
      main: '#FF0436',
    },
    background: {
      default: '#1f1f1f',
      paper: '#222222',
    },
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
    MuiButton: {
      root: {
        background: '#222222',
        color: '#fff',
        border: '1px solid transparent',
        borderRadius: 500,
        '&:hover': {
          background: '#FF4E6B !important',
        },
      },
      textSecondary: {
        border: '1px solid #FF4E6B',
        background: '#000',
      },
      label: {
        color: '#FF4E6B',
        paddingRight: '1rem',
        paddingLeft: '0.7rem',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '0.875rem',
        lineHeight: '1rem',
        borderRadius: '7px',
        marginRight: '16px'
      }
    },
    MuiIconButton{
      root: {
        backgroundColor: 'rgba(0,0,0 / 20%)',
        '&:hover': {
          backgroundColor: '#FF4E6B !important'
        }
      }
    },
    MuiMenuItemIcon: {
      root: {
        minWidth: '36px',
      }
    },
    MuiFormGroup: {
      root: {
        color: 'white',
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#FF4E6B',
      }
    },
    NDAlbumDetails: {
      root: {
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
    
    NDArtistShow: {
      actions: {
        padding: '2rem 0',
        alignItems: 'center',
        overflow: 'visible',
        '@global': {
          button: {
            border: '1px solid transparent',
            backgroundColor: '#222222',
            color: '#FF4E6B',
            margin: '0 0.5rem'
          },
          // Hide shuffle button label (first button)
          'button:first-child>span:first-child>span': {
            display: 'none',
          },
          // Style shuffle button (first button)
          'button:first-child': {
            transform: 'scale(1.5)',
            margin: '1rem',
            minWidth: 0,
            padding: 5,
            transition: 'transform .3s ease',
            background: '#FF4E6B',
            color: '#fff',
            borderRadius: 500,
            border: 0
          },
          'button:first-child>span:first-child': {
            padding: 0,
          },
          'button>span:first-child>span, button:not(:first-child)>span:first-child>svg':
            {
              color: '#b3b3b3',
            },
        },
      },
      actionsContainer: {
        overflow: 'visible',
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
    NDAudioPlayer: {
      audioTitle: {
        color: '#fff',
        fontSize: '0.875rem',
      },
      songTitle: {
        fontWeight: 400,
      },
      songInfo: {
        fontSize: '0.675rem',
        color: '#b3b3b3',
      },
      player: {
        border: '10px solid #FF0436',
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