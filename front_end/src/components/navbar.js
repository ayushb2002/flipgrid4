import * as React from 'react';
import { Container,AppBar,Box,Toolbar,IconButton,Typography,Menu,Avatar,Button,Tooltip,MenuItem} from "@material-ui/core" ;
import AdbIcon from '@material-ui/icons/Adb';
import MenuIcon from '@material-ui/icons/Menu';
import './navbar.css';
import {Link,BrowserRouter,useNavigate} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material'
import SearchIcon from '@material-ui/icons/Search';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles } from "@material-ui/core";
import { stringify } from 'querystring';
import { WalletContext } from '../context';

const pages = [{text:'Buy',leadTo:'/buy'}, {text:'Sell',leadTo:'/List'},{text:'Your NFTs',leadTo:'/your-nfts'}];
const settings = [{text:'My Listings',leadTo: '/mylistings'}, {text:'Verify Ownership',leadTo: '/Verify'},{text:'Check Warranty',leadTo: '/checkwar'},{text:'Rewards',leadTo: '/'}];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  container: {
      padding: theme.spacing(4),
      display: "flex",
      justifyContents: "flex-end",
      gap: theme.spacing(1),
      backgroundColor:"transparent"
  }
}));

export const Navigation_Bar = () => {
  const navigator=useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();
  const { activateBrowserWallet, account, deactivate,chainId } = useEthers();
  const { wal,setWal }=React.useContext(WalletContext)
  setWal(account)

  const isConnected = account !== undefined;
  const bakwas =async()=>{
    const abcdefgh=await fetch("http://127.0.0.1:5000")
    console.log(abcdefgh)
  }

  const [currB,setCurrB] = React.useState('NA');
    const balance =async()=>{
        const query='https://api-testnet.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x0000000000000000000000000000000000001010&address='+account+'&tag=latest&apikey=3VVB21M8Z1HRIB6URJC363ZQT8WE5PDAAU'
        const result=await fetch(query)
        
        
        const body = await result.json()
        let result2 = body["result"].substr(body["result"].length-18);
        let result3 = body["result"].substr(0,body["result"].length-18);
        console.log(result3+"."+result2)
        setCurrB ((result3+"."+result2).substring(0,6))
    }
    if (isConnected){
      balance()
    }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography 
  
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div className='flexer'>
                <div  className='black'>WarrantyNFT</div><div className='spacer'></div>
            </div>
            
            
          </Typography>
          <div className="outerr">
                <div className="innerr"></div>
            </div>
            
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={()=>{handleCloseNavMenu();} }>
                  <Typography  component="a" href={page.leadTo}>
                      
                      <div className='black'>
                        {page.text}
                      </div>
                     
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={()=>{handleCloseNavMenu();} }
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography  component="a" href={page.leadTo}>
                      
                      <div className='black'>
                        {page.text}
                      </div>
                     
                  </Typography>
              </Button>
            ))}
            {/* <Button
                key='your-nfts'
                onClick={()=>{handleCloseNavMenu();} }
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography >
                      
                      <Link to='/your-nfts' className='black'>
                        Your NFTS
                      </Link>
                     
                  </Typography>
              </Button> */}
          </Box>
          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                  <Typography >
                    
                    <Link to={setting.leadTo} className='black'>
                      {setting.text}
                    </Link>
 
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem key='Login' >
                  <Typography >
                    
                      {_jsx("div", Object.assign( { children: _jsx("div", { children: isConnected ? (_jsx(Button, Object.assign({ color: "default", onClick: async ()=>{deactivate(); setCurrB('NA')}}, { children: "Disconnect" }))) : (_jsx(Button, Object.assign({ color: "default", onClick: async() => {activateBrowserWallet();balance()} }, { children: "Connect" }))) }) }))}
                    
                  </Typography>
                </MenuItem>
                <MenuItem key='Bal'><Typography>Balance:</Typography>{currB}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
};

