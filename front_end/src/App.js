import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./pages/homepage";
import { List } from "./pages/listing";
import { MyWallet } from "./pages/wallet";
import { MyWallet2 } from './pages/wallet2';
import {Navigation_Bar} from "./components/navbar";
import {Navigation_Bar2} from "./components/navbar2";
import {User_prelist} from "./pages/user_pre_listing";
import {Verify} from "./pages/verify_ownership";
import { ChainId, DAppProvider } from '@usedapp/core';
import { SlList } from './pages/seller_listing';
import { Things } from './pages/buy';
import { WalletProv } from './context';
import { User_NFT_List } from './pages/yournft';
import { User_has_listed } from './pages/userhaslisted';
import { WarrantyCheck } from './pages/checkwarranty';
function App() {
  const signinmethod=''
  
  return (
    <WalletProv>
    <>
    
    <DAppProvider config = {{
      supportedChains: [ChainId.Kovan, ChainId.Rinkeby, ChainId.Mumbai]
    }}>
    <BrowserRouter>
      <Navigation_Bar/>

        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/buy' element={<Things/>}/>
          <Route path='/your-nfts' element={<User_NFT_List/>}/>
          <Route path='/List' element={<User_prelist/>}/>
          <Route path='/SList' element={<SlList/>}/>
          <Route path='/mylistings' element={<User_has_listed/>}/>
          <Route path='MyWallet' element={<MyWallet/>}/>
          <Route path='Wallet' element={<MyWallet/>}/>
          <Route path='Verify' element={<Verify/>}/>
          <Route path='CheckWar' element={<WarrantyCheck/>}/>
        </Routes>

      </BrowserRouter>
      </DAppProvider>
      </>
      </WalletProv>
  );
}

export default App;
