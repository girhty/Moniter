import {  Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Speedometer from '../../components/speedo/index'
import * as Progress from 'react-native-progress';

import { useEffect, useState } from 'react';
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const values_classe=`text-lg font-semibold ${colorScheme ==="dark" ? "text-white" :"text-black"}`
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress((prevProgress) =>
          Math.min(1, prevProgress + Math.random() / 5)
        );
      }, 500);
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView>
      <View className="flex flex-col w-full h-full items-center space-y-4">
      <View className="bg-[#022930] rounded-full w-11/12 h-1/2 flex flex-col items-center mb-8">
      <Progress.Circle color='#D0D2D6' thickness={15} indeterminate={indeterminate} direction='counter-clockwise' showsText progress={progress} size={350} borderColor='black'/>
      <Text className={`mt-2 ${values_classe}`}>Water Level</Text>
      </View>
      <View className="flex flex-col items-center w-full ">
      <View className="flex flex-row justify-between items-center w-full p-2">
      <Text className={values_classe}>Node battery</Text>
      <Progress.Bar progress={progress} indeterminate={indeterminate}  width={235} height={25} color="#97c72a"/>
      </View>
      <View className="flex flex-row justify-between items-center w-full p-2">
      <Text className={values_classe}>Sensor battery</Text>
      <Progress.Bar progress={progress} indeterminate={indeterminate} width={235} height={25} color="#97c72a"/>
      </View>
      </View>
      <View  className="flex flex-col justify-center w-full space-y-3 p-1">
          <View><Text className={values_classe}>Temp : 28c</Text></View>
          <View><Text className={values_classe}>Humidity : 45%</Text></View>
          <View><Text className={values_classe}>Hatch stats : closed</Text></View>
          <View><Text className={values_classe}>Pump stats : on</Text></View>
      </View>
      </View>
    </SafeAreaView>
  );
}


