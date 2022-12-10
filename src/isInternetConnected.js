import NetInfo from '@react-native-community/netinfo';
export const isInternetConnected=async()=>{
   return NetInfo.fetch().then(state => {
        return state.isConnected
      });
}