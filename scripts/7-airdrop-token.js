import sdk from "./1-initialize-sdk.js";

// Esse é o endereço do nosso contrato ERC-1155 do NFT de filiação.
const editionDrop = sdk.getEditionDrop("0x0C9ecE84eE437252A7e61dc02b5B0fAf3CdE5F7e");

// Esse é o endereço do nosso contrato ERC-20 do nosso token.
const token = sdk.getToken("0xe952512456B095E3e449E6Ce6d9BA8189Ae45F48");

(async () => {
  try {
    // Pegue o endereço de todas as pessoas que possuem o nosso NFT de filiação, que tem
    // o tokenId 0.
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
  
    if (walletAddresses.length === 0) {
      console.log(
        "Ninguém mintou o NFT ainda, peça para alguns amigos fazerem isso e ganhar um NFT de graça!",
      );
      process.exit(0);
    }
    
    // faça um loop no array de endereços.
    const airdropTargets = walletAddresses.map((address) => {
      // Escolha um # aleatório entre 1000 e 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Vai enviar", randomAmount, "tokens para ", address);
      
      // Configure o alvo.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
  
      return airdropTarget;
    });
    
    // Chame transferBatch em todos os alvos do airdrop.
    console.log("🌈 Começando o airdrop...")
    await token.transferBatch(airdropTargets);
    console.log("✅ Feito o airdrop de tokens para todos os donos de NFT!");
  } catch (err) {
    console.error("O airdrop de tokens falhou", err);
  }
})();