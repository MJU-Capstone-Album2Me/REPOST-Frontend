
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import Dialog from "react-native-popup-dialog";
import { SubButton, MainButton } from "../atoms/Buttons";
import { CustomText } from "../atoms/Text";
import { MainTextInput } from "../atoms/TextInput";
import { createRoom } from "../../util/room";
import { useSelector } from "react-redux";

export const RoomBox = (props) => {
  const [visible, setVisible] = useState(false)
  const [entranceVisible, setEntranceVisible] = useState(false)
  const [inviteVisible, setInviteVisible] = useState(false)
  const [inviteLink, setInviteLink] = useState(null)
  const [newRoomTitle, setNewRoomTitle] = useState(null)
  const [newRoomTitleError, setNewRoomTitleError] = useState(false)
  const token = useSelector((state) => state.auth.token)

  return (
    <View style={styles.newCont}>
        {props.addedBtn ? 
        <Pressable
          onPress={()=> {setVisible(true)}}>
        <View style={styles.addedContainer}>
          <Text style={{fontSize:40, color:'#0080FE'}}>+</Text>
        </View>
        <Dialog
          visible={visible}
          onTouchOutside={() => {
            setVisible(false)
          }}
          width={180}
          dialogStyle={{ justifyContent:'center',  display:'flex'}}
        >
          <SubButton
            onPress={ () => {
              setVisible(false)
              setEntranceVisible(true)
            }}
            style={{borderRadius: 0}}>
              방 들어가기
          </SubButton>
          <SubButton 
            onPress={() => {
              setVisible(false)
              setInviteVisible(true)
            }}
            style={{borderRadius: 0}}>
              방 만들기
          </SubButton>
        </Dialog>
        {/* 방 입장 */}
        <Dialog
          visible={entranceVisible}
          onTouchOutside={() => {
            setEntranceVisible(false)
          }}
          width={300}
          height={140}
          dialogStyle={{ justifyContent:'center',  display:'flex'}}
        >
          <MainTextInput
            placeholder={"초대 링크"}
            setChange={setInviteLink}
            style={{marginTop: 10}}
          />
          <MainButton
            onPress={ () => {
              setInviteVisible(false)
            }}
            style={{borderRadius: 0, width: 100, alignSelf: 'flex-end'}}>
              입장 요청
          </MainButton>
        </Dialog>
        {/* 방 만들기 */}
        <Dialog
          visible={inviteVisible}
          onTouchOutside={() => {
            setInviteVisible(false)
          }}
          width={300}
          height={140}
          dialogStyle={{ justifyContent:'center',  display:'flex'}}
        >
          <MainTextInput
            placeholder={"룸 이름을 붙여주세요"}
            setChange={setNewRoomTitle}
            style={{marginTop: 10}}
            isWrong={newRoomTitleError}
          />
          <MainButton
            onPress={ async () => {
              if (newRoomTitle==null) {
                setNewRoomTitleError(true)
              } else {
                console.log(newRoomTitle)
                setInviteVisible(false)
                await createRoom(newRoomTitle, token)
                console.log('complete')
              }
            }}
            style={{borderRadius: 0, width: 100, alignSelf: 'flex-end'}}>
              룸 생성
          </MainButton>
        </Dialog>
      </Pressable>
        :
        <Pressable
          onPress={props.onPress ? props.onPress : null}>
          <View 
            style={styles.container} 
            >
            {props.hasAlarm ?
              <View style={styles.alram}></View>:null}
              <Text
                style={styles.customtext}
              >우리팀 화이팅</Text>
              <CustomText
                style={styles.subtext}
              >총 10명</CustomText>
          </View>
        </Pressable>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  newCont: {
    flex: 0.5
  },
  container: {
    margin: 10,
    flex: 1,
    // borderColor: '#111111',
    // borderStyle: 'solid',
    // borderWidth: 0.5,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 20,
    height:110,
  },
  addedContainer:{
    margin:10,
    flex: 1,
    borderColor: '#0080FE',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 20,
    height:110,
  },
  customtext: {
    margin: 5,
    fontSize:20,
    fontFamily: 'nexon-gothic-medium'
  },
  subtext: {
    margin: 5,
    color:'grey'
  },
  alram:{
    position:'absolute', 
    top:0, 
    right:0, 
    backgroundColor:'#0080FE', 
    width:10, 
    height:10,
    borderRadius:5
  }
})
