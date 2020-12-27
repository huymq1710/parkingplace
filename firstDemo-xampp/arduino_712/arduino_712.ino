#include <SoftwareSerial.h>
SoftwareSerial nodemcu(2,3);

int cdata = 0;
int pre_cdata = 0;

int parkingSlot[6];
int sensorData[6];

void readSensor(int i){

  if(digitalRead(parkingSlot[i]) == LOW){
    sensorData[i] = 1;
    delay(200); 
  }

  if(digitalRead(parkingSlot[i]) == HIGH){
    sensorData[i] = 0;
    delay(200); 
  }
  //Serial.print(i);
  //Serial.print(": ");
  //Serial.println(sensorData[i]);
}

int pow_2(int i){
  int res = 1;
  while(i--){
    res = res *2;
  }
  return res;
}
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200); 
  nodemcu.begin(115200);
  
  for(int i=0; i<6; i++){
    parkingSlot[i] = i+4;
    sensorData[i]  = 0;
    pinMode(parkingSlot[i], INPUT);
  } 
  
}

void loop() {
  // put your main code here, to run repeatedly:
  for(int i=0; i<6; i++){
    readSensor(i);
    cdata = cdata + sensorData[i]*pow_2(i);
  }
  if(cdata != pre_cdata){
    pre_cdata = cdata;

    Serial.println(cdata); 
    nodemcu.println(cdata);
  }
  
  delay(6000); // 100 milli seconds
 
  cdata = 0;
  for(int i=0; i<6; i++){
      digitalWrite( parkingSlot[i], HIGH); 
    }
}
