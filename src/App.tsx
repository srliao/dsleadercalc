import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ThemeProvider } from "./components/theme-provider";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";

function App() {
  const [rodBaseHeight, setRodBaseHeight] = useState<number>(2); //ft
  const [rodLength, setRodLength] = useState<number>(6.5); //ft
  const [rodAngle, setRodAngle] = useState<number>(22.5); //degrees
  const [waterDepth, setWaterDepth] = useState<number>(15); //ft
  const [castingDistance, setCastingDistance] = useState<number>(50); //ft
  const [leaderLength, setLeaderLength] = useState<number>(12); //inches


  const rodAngleRad = rodAngle*Math.PI/180
  const rodVerticalHeight = Math.sin(rodAngleRad) * rodLength
  const rodHorizontalLength = Math.cos(rodAngleRad) * rodLength
  const lineOutHorizontalDistance = (castingDistance - rodHorizontalLength)
  const lineOutVerticalDistance = (rodVerticalHeight+rodBaseHeight+waterDepth)
  console.log("horizontal", lineOutHorizontalDistance)
  console.log("vertical", lineOutVerticalDistance)
  const lineOut = Math.sqrt(lineOutVerticalDistance**2 + lineOutHorizontalDistance**2)

  const lineOutSineAlpha = lineOutVerticalDistance / lineOut
  const lureHeightInInches = lineOutSineAlpha * (leaderLength );

  //for information only - visible horizontal distance
  // const alpha = Math.asin(lineOutSineAlpha)
  const lineOutCosineAlpha = lineOutHorizontalDistance / lineOut
  console.log("alpha", Math.asin(lineOutSineAlpha)*180/Math.PI)
  const underWaterWidth = lineOutCosineAlpha * waterDepth /   lineOutSineAlpha 
  const aboveWaterWidth = lineOutHorizontalDistance - underWaterWidth
  console.log("under water width", underWaterWidth)
  console.log("above water width", aboveWaterWidth)
  console.log("visible line distance", aboveWaterWidth + rodHorizontalLength)

  return (
    <ThemeWrapper>
      <div className="flex flex-col gap-2 p-2 items-center">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl mb-3">
          Dropshot Lure Depth Calculator
        </h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {`You will have ${Math.round((lineOut+Number.EPSILON)*100)/100} ft of line out`}
            <br />
            {`Your lure will be ${Math.round((lureHeightInInches+Number.EPSILON)*100)/100} inches (${Math.round((lureHeightInInches/12+Number.EPSILON)*100)/100} ft) off the bottom.`}
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              <Label htmlFor="rod_base_height">
                Rod Vertical Height
                <br />
                <div className="text-xs p-2">This is the distance of the rod butt from the surface of the water</div>
                </Label>
              <div className="flex flex-row">
                <Slider
                  id="rod_base_height"
                  value={[rodBaseHeight]}
                  max={20}
                  step={0.1}
                  onValueChange={(v) => setRodBaseHeight(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="rod_base_height"
                  className="w-[100px]"
                >{`${rodBaseHeight} ft`}</Label>
              </div>
              <Separator />
              <Label htmlFor="rod_length">Rod Length</Label>
              <div className="flex flex-row">
                <Slider
                  id="rod_length"
                  value={[rodLength]}
                  min={2}
                  max={10}
                  step={0.1}
                  onValueChange={(v) => setRodLength(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="rod_length"
                  className="w-[100px]"
                >{`${rodLength} ft`}</Label>
              </div>
              <Separator />
              <Label htmlFor="rod_angle">
                Rod Angle 
                <br />
                <div className="text-xs p-2">This is the angle of the rod to the water surface (where flat to the water is 0 degree and perpendicular is 90 degree)</div>
              </Label>
              <div className="flex flex-row">
                <Slider
                  id="rod_angle"
                  value={[rodAngle]}
                  max={90}
                  step={1}
                  onValueChange={(v) => setRodAngle(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="rod_angle"
                  className="w-[100px]"
                >{`${rodAngle} deg`}</Label>
              </div>
              <Separator />
              <Label htmlFor="water_depth">Water Depth</Label>
              <div className="flex flex-row">
                <Slider
                  id="water_depth"
                  value={[waterDepth]}
                  min={1}
                  max={100}
                  step={0.5}
                  onValueChange={(v) => setWaterDepth(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="water_depth"
                  className="w-[100px]"
                >{`${waterDepth} ft`}</Label>
              </div>
              <Separator />
              <Label htmlFor="casting_distance">
                Casting Distance
                <br />
                <div className="text-xs p-2">Distance from you to where lure lands in the water</div>
                </Label>
              <div className="flex flex-row">
                <Slider
                  id="casting_distance"
                  value={[castingDistance]}
                  max={200}
                  step={1}
                  onValueChange={(v) => setCastingDistance(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="casting_distance"
                  className="w-[100px]"
                >{`${castingDistance} ft`}</Label>
              </div>
              <Separator />
              <Label htmlFor="leader_length">Leader Length</Label>
              <div className="flex flex-row">
                <Slider
                  id="leader_length"
                  value={[leaderLength]}
                  max={120}
                  step={1}
                  onValueChange={(v) => setLeaderLength(v[0])}
                  className="grow mr-2"
                />
                <Label
                  htmlFor="leader_length"
                  className="w-[100px]"
                >{`${leaderLength} inches`}</Label>
              </div>
              <Separator />
            </div>
          </CardContent>
        </Card>

      </div>
    </ThemeWrapper>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default App;
