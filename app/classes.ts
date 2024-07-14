import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Info {
    data:{
    dimeter?: number;
    height?: number;
    water_level?: { value: number; direction: string };
    pump_activation?: { value: number; direction: string };
    distance?: boolean;}
  }

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('settings', jsonValue);
    } catch (e) {
      console.log(e)
    }
  };

export class Info{
    constructor(){
        this.data={}
    }
    setInfo(
        d: number,
        h: number,
        wla: number,
        wlb: boolean,
        pl: number,
        plb: boolean,
        dis: boolean
      ) {
          this.data.dimeter= d
          this.data.distance=dis
          this.data.height=h
          this.data.pump_activation={ value: pl, direction: plb ? "B" : "A" }
          this.data.water_level={ value: wla, direction: wlb ? "B" : "A" }
        storeData({data:this.data})
        const msg=`W${this.data.water_level.direction+String(this.data.water_level.value)}P${this.data.pump_activation.direction+String(this.data.pump_activation.value)}`
        const newsock=new WebSocket("ws://4.4.4.100:80")
        newsock.onopen = () => {
              newsock.send(msg); // send a message
        };
        newsock.close()
        }
    getInfo = async () => {
          try {
            const value = await AsyncStorage.getItem('settings');
            if (value !== null && value.length!==0) {
              const obj=JSON.parse(value)
              return obj
            }
          } catch (e) {
            console.log(e)
          }
        };
}

export const info=new Info()