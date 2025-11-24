import { Text, View } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { globalStyles } from '../styles/styles';


export default function EventsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Events Screen</Text>
      <Button onPress={() => navigation.navigate('Profile')}>
        Go to Profile
      </Button>
    </View>
  );
}