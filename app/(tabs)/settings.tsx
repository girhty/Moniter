import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "expo-checkbox";
import Slider from "@react-native-community/slider";
import { useState } from "react";
interface Info {
  dimeter: number;
  height: number;
  water_level: { value: number; direction: string };
  pump_activation: { value: number; direction: string };
  distance: boolean;
}
export default function TabTwoScreen() {
  function setInfo(
    d: number,
    h: number,
    wla: number,
    wlb: boolean,
    pl: number,
    plb: boolean,
    dis: boolean
  ) {
    const out: Info = {
      dimeter: d,
      distance: dis,
      height: h,
      pump_activation: { value: pl, direction: plb ? "below" : "above" },
      water_level: { value: wla, direction: wlb ? "below" : "above" },
    };
    console.log(out);
  }
  const colorScheme = useColorScheme();
  const [water_level_below, setWater_level_below] = useState(false);
  const [pump_level_below, setPump_level_below] = useState(false);
  const [distance, setDistance] = useState(false);
  const [water_level, setWater_level] = useState(0);
  const [pump_level, setPump_level] = useState(0);
  const [height, setHeight] = useState(0);
  const [dimeter, setDimeter] = useState(0);
  const textstyl =
    "text-xl font-semibold" + `${colorScheme === "dark" ? " text-white" : ""}`;
  const toggle = "w-6 h-6 border-4";
  return (
    <SafeAreaView>
      <View className="flex flex-col items-center space-y-3 mt-4">
        {/* Inputs section */}
        <View className="flex flex-col w-full items-center space-y-2">
          <View className="w-full flex flex-row justify-between p-1 items-center">
            <Text className={textstyl}>Dimeter(MM)</Text>
            <TextInput
              onChange={(e) => setDimeter(Number(e.nativeEvent.text))}
              className={`w-52 h-14 border-2 rounded-lg p-2 ${
                colorScheme === "dark"
                  ? "text-white border-white placeholder-green-600"
                  : ""
              } font-semibold text-lg`}
              keyboardType="numeric"
            />
          </View>
          <View className="w-full flex flex-row justify-between p-1 items-center">
            <Text className={textstyl}>Height(MM)</Text>
            <TextInput
              onChange={(e) => setHeight(Number(e.nativeEvent.text))}
              className={`w-52 h-14 border-2 rounded-lg p-2 ${
                colorScheme === "dark"
                  ? "text-white border-white placeholder-white"
                  : ""
              } font-semibold text-lg`}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* Silders section */}
        <View className="flex flex-col items-center w-11/12">
          <Text className={textstyl}>Water Level Alarm</Text>
          <Slider
            style={{ width: 370, height: 40 }}
            minimumValue={0}
            step={1}
            value={water_level}
            onSlidingComplete={(val) => setWater_level(val)}
            maximumValue={100}
            minimumTrackTintColor={colorScheme === "dark" ? "green" : "#45818E"}
            maximumTrackTintColor={colorScheme === "dark" ? "white" : "#000000"}
            thumbTintColor="black"
          />
          <Text className={textstyl}>{water_level && water_level}</Text>
          <View className="flex flex-row space-x-2 p-3 items-center w-full">
            <CheckBox
              className={toggle}
              disabled={false}
              value={water_level_below}
              onValueChange={(newValue) => setWater_level_below(newValue)}
              color={"#45818E"}
            />
            <Text className={textstyl}>Below</Text>
          </View>
        </View>
        <View className="flex flex-col items-center w-11/12">
          <Text className={textstyl}>Pump Activation</Text>
          <Slider
            style={{ width: 370, height: 40 }}
            minimumValue={0}
            value={pump_level}
            step={1}
            onSlidingComplete={(val) => setPump_level(val)}
            maximumValue={100}
            minimumTrackTintColor={colorScheme === "dark" ? "green" : "#45818E"}
            maximumTrackTintColor={colorScheme === "dark" ? "white" : "#000000"}
            thumbTintColor="black"
          />
          <Text className={textstyl}>{pump_level && pump_level}</Text>
          <View className="flex flex-row space-x-2 p-3 items-center w-full">
            <CheckBox
              className={toggle}
              disabled={false}
              value={pump_level_below}
              onValueChange={(newValue) => setPump_level_below(newValue)}
              color={"#45818E"}
            />
            <Text className={textstyl}>Below</Text>
          </View>
        </View>
        {/* toggle distance */}
        <Text className={textstyl}>
          - Toggle Between Distance and Water Level
        </Text>
        <View className="flex flex-row space-x-2 p-3 items-center w-11/12">
          <CheckBox
            className={toggle}
            disabled={false}
            value={distance}
            onValueChange={(newValue) => setDistance(newValue)}
            color={"#45818E"}
          />
          <Text className={textstyl}>Distance</Text>
        </View>
        <TouchableOpacity className="w-2/6 flex flex-col items-center text-center bg-opacity-30 border-2 bg-[#45818E] rounded-md p-2">
          <Text
            className={textstyl}
            onPress={() =>
              setInfo(
                dimeter,
                height,
                water_level,
                water_level_below,
                pump_level,
                pump_level_below,
                distance
              )
            }>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
