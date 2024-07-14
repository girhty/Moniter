import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { info } from "../classes";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const values_classe = `text-lg font-semibold ${
    colorScheme === "dark" ? "text-white" : "text-black"
  }`;
  const [progress, setProgress] = useState(0);
  const [dbl, setDbl] = useState(0);
  const [nbl, setNbl] = useState(0);
  const [temp, setTemp] = useState(0);
  const [humd, sethumd] = useState(0);
  const [hatch, sethatch] = useState(0);
  const [pump, setPump] = useState(0);
  const [sock, setSock] = useState<WebSocket>();

  useEffect(() => {
    const conn = new WebSocket("ws://4.4.4.100:80");
    conn.onopen=()=>{Communicate(conn);setSock(conn)}
  }, []);
  async function Communicate(C: WebSocket) {
    const dimentions = await info.getInfo();
    C.send("new connection");
    C.onmessage = function (event) {
      const params = {};
      const incoming = String(event.data).split(",");
      for (const i of incoming) {
        const param = i.split(":");
        params[param[0]] = param[1];
      }
      if (dimentions.height && dimentions.dimeter) {
        const level = Math.floor(
          ((params.ds - dimentions.height) * 3.14 * dimentions.dimeter) ^ 2
        );
        const tank = Math.floor(
          (dimentions.height * 3.14 * dimentions.dimeter) ^ 2
        );
        setProgress(-level / tank);
      } else {
        setProgress(params.ds);
      }
      setDbl(params.dbl);
      setNbl(params.nbl);
      setPump(Number(params.pst));
      setTemp(Number(params.tmp));
      sethatch(Number(params.htst));
      sethumd(Number(params.hd));
    };
    C.onerror = function (error) {
      console.error("error:", error);
    };
  }
  function Connect() {
    if (sock?.readyState === 1) {
      Communicate(sock);
    } else {
      const conn = new WebSocket("ws://4.4.4.100:80");
      setSock(conn);
      Communicate(conn);
    }
  }
  return (
    <SafeAreaView>
      <View className="flex flex-col w-full h-full items-center space-y-4">
        <View className="w-11/12 h-1/2 flex flex-col mt-4 items-center mb-12">
          <Progress.Circle
            color={progress / 100 < 0.5 ? "red" : "blue"}
            style={{ borderRadius: 9999, backgroundColor: "green" }}
            thickness={35}
            direction="counter-clockwise"
            showsText
            progress={progress / 100}
            size={350}
          />
          <View className="flex flex-row w-full justify-evenly items-center">
            <Text className={`mt-4 ${values_classe}`}>Water Level</Text>
            <TouchableOpacity
              className="w-18 h-8 p-1 border bg-slate-600"
              onPress={() => Connect()}
            >
              <Text className="text-green-700 font-semibold">Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col items-center w-full ">
          <View className="flex flex-row justify-between items-center w-full p-2">
            <Text className={values_classe}>Node battery</Text>
            <Progress.Bar
              progress={nbl / 100.0}
              width={215}
              height={25}
              color={nbl / 100 < 0.5 ? "red" : "#97c72a"}
            />
          </View>
          <View className="flex flex-row justify-between items-center w-full p-2">
            <Text className={values_classe}>Sensor battery</Text>
            <Progress.Bar
              progress={dbl / 100.0}
              width={215}
              height={25}
              color={dbl / 100 < 0.5 ? "red" : "#97c72a"}
            />
          </View>
        </View>
        <View className="flex flex-col justify-center w-full space-y-3 p-1">
          <View>
            <Text className={values_classe}>Temp : {temp}</Text>
          </View>
          <View>
            <Text className={values_classe}>Humidity : {humd}</Text>
          </View>
          <View>
            <Text className={values_classe}>
              Hatch stats : {hatch ? "open" : "closed"}
            </Text>
          </View>
          <View>
            <Text className={values_classe}>
              Pump stats : {pump ? "open" : "closed"}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
