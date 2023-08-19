import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular as roboto400Regular,
  Roboto_700Bold as roboto700Bold,
} from '@expo-google-fonts/roboto'

import { Groups } from '@screens/Groups'
import theme from '@theme/index'
import { Loading } from '@components/Loading'
import { StatusBar } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    roboto400Regular,
    roboto700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
