 import Kingw from "../../assets/piceses/kingw-removebg-preview.png"
 import Queenw from "../../assets/piceses/queenw-removebg-preview.png"
 import Rookw from "../../assets/piceses/rookw-removebg-preview.png"
 import Bishopw from "../../assets/piceses/bishopw-removebg-preview.png"
 import Knightw from "../../assets/piceses/knightw-removebg-preview.png"
 import Pawnw from "../../assets/piceses/pawnw-removebg-preview.png"
 import Kingb from "../../assets/piceses/kingb-removebg-preview.png"
 import Queenb from "../../assets/piceses/queenb-removebg-preview.png"
 import Rookb from "../../assets/piceses/rookb-removebg-preview.png"
 import Bishopb from "../../assets/piceses/bishopb-removebg-preview.png"
 import Knightb from "../../assets/piceses/knightb-removebg-preview.png"
 import Pawnb from  '@/assets/piceses/pawnb-removebg-preview.png'




type piecesAvatar= Record<any,any>

const pieces: piecesAvatar[] = [
  { r: Rookb },
  { n: Knightb },
  { b: Bishopb },
  { q: Queenb },
  { k: Kingb },
  { p: Pawnb },
  
  { R: Rookw },
  { N: Knightw },
  { B: Bishopw },
  { Q: Queenw },
  { K: Kingw },
  { P: Pawnw }
];








export default pieces;