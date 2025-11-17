import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
interface history{
  before: string;
  after: string;
  color: string;
  piece: string;
  from: string;
  to: string;
  san: string;
  lan: string;
  flags: string;
}
interface InfoProps {
  history: history[];
  gameinfo: {
    name1: string;
    name2: string;
    gameid: string;
    gamestarted: Date;
  };
}
const chessSymbols: Record<string, string> = {
  wq: "♔",
  wk: "♕",
  wr: "♖",
  wb: "♗",
  wn: "♘",
  wp: "♙",
  bq: "♚",
  bk: "♛",
  br: "♜",
  bb: "♝",
  bn: "♞",
  bp: "♟",
};

const GameInfo = (props: InfoProps) => {
  return (
    <Card className="w-[350px] md:w-[420px] h-[300px] md:h-auto bg-zinc-900 text-white shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className=" text-l md:text-xl font-semibold tracking-wide text-center">
          Game Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-zinc-800 rounded-xl p-1">
            <TabsTrigger
              value="history"
              className="rounded-lg data-[state=active]:bg-white transition-all"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="gameinfo"
              className="rounded-lg data-[state=active]:bg-white transition-all"
            >
              Game Info
            </TabsTrigger>
          </TabsList>

          {/* History */}
          <TabsContent value="history" className="mt-4  max-h-[145px] md:max-h-[300px] overflow-y-auto space-y-2">
            {props.history.length === 0 ? (
              <div className="text-gray-400 text-sm italic text-center">
                No moves yet...
              </div>
            ) : (
              props.history.map((move, index) => {
                const { from, to ,piece,color} = move;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 md:px-4 py-1 md:py-2 hover:bg-zinc-700 transition-all"
                  >
                    <span className="font-semibold text-zinc-300">{index + 1}.</span>
                    <span className="font-mono">{chessSymbols[`${color}${piece}`]}{from}</span>
                    <span className="text-zinc-400">→</span>
                    <span className="font-mono">{to}</span>
                  </div>
                );
              })
            )}
          </TabsContent>

          {/* Game Info */}
          <TabsContent value="gameinfo" className="mt-4  max-h-[145px] md:max-h-[300px] overflow-y-auto space-y-2">
            <div className="bg-zinc-800 p-3 rounded-lg">
              <span className="font-semibold">Player 1:</span> {props.gameinfo.name1}
            </div>
            <div className="bg-zinc-800 p-3 rounded-lg">
              <span className="font-semibold">Player 2:</span> {props.gameinfo.name2}
            </div>
            <div className="bg-zinc-800 p-3 rounded-lg">
              <span className="font-semibold">Game ID:</span> {props.gameinfo.gameid}
            </div>
            <div className="bg-zinc-800 p-3 rounded-lg">
              <span className="font-semibold">Started:</span>{" "}
              {props.gameinfo.gamestarted.toLocaleTimeString()}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GameInfo;
