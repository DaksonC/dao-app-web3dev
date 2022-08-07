import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xD6EC586beE9A22E5F1B5Df0ac3077EE624568ba2");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Datacoin",
        description: "Esse NFT vai te dar acesso ao SidelabDAO!",
        image: readFileSync("scripts/assets/datacoin.png"),
      },
    ]);
    console.log("✅ Novo NFT criado com sucesso no !");
  } catch (error) {
    console.error("falha ao criar o novo NFT", error);
  }
})()