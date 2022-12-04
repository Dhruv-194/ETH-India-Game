let provider = new ethers.providers.Web3Provider(window.ethereum)

let signer

async function connectMetamask(){
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    var address = await signer.getAddress();
    console.log("Account Address: ", address);
    alert("connected");
    document.getElementById("greetin-message").innerHTML = "Hello! " + address+ " Take your rewards now or PlayAgain";
    const balance = await signer.getBalance()
    const convertEth = 1e18;
    console.log("account's balance in ethers: ", balance.toString() / convertEth);
}

async function claimTokens(){
    const runTokenContractAddress = "0xf0FD3C48Bd67b41A3995d7Bea0103A4fb590d3d7";
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    let amountToClaim = window.totalGweiScore * convertToWei
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNft(){
    const nftContractAddress="0xe8779151c59fC5E52b8d7F76a35F404b09DB1279";
    const mintContractsAbi = [
        "function mint(uint256 amount) public", 
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractsAbi, provider);
    await nftContract.connect(signer).mint(window.totalNFTScore.toString())
}