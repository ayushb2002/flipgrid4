import { useEthers } from "@usedapp/core";
export const MyWallet2 =() =>{
    const { activateBrowserWallet, account, deactivate,chainId } = useEthers();
    console.log('InH',account);
    const balance =async()=>{
        const result=await fetch('https://api-testnet.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x0000000000000000000000000000000000001010&address=0x133aFe86B6cB9fEc747A45e1420F50db6149947a&tag=latest&apikey=3VVB21M8Z1HRIB6URJC363ZQT8WE5PDAAU')
        console.log(result.body)
        const body = await result.json()
        console.log(body["result"])
        let result2 = body["result"].substr(body["result"].length-18);
        let result3 = body["result"].substr(0,body["result"].length-18);
        console.log(result3+"."+result2)

    }
    balance()
}
