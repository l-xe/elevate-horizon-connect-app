import { Text, View } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';


export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}