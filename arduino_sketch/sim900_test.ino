#include <SoftwareSerial.h>

// --- Pin Definitions ---
// User confirmed jumpers are set to D7 (RX) and D8 (TX)
SoftwareSerial mySerial(7, 8); // RX, TX

void setup() {
  // 1. Initialize USB Serial (Computer Connection)
  Serial.begin(9600);
  while (!Serial) {
    ; // Wait for serial port to connect. Needed for native USB port only
  }
  
  Serial.println("--- SIM900 Test Basliyor (9600 Baud) ---");
  Serial.println("Lutfen 'AT' yazip Enter'a basin.");
  Serial.println("-----------------------------");

  // 2. Initialize SIM900 Serial
  // 19200 calismadi, simdi 9600 deniyoruz.
  mySerial.begin(9600); 
}

void loop() {
  // SIM900'den gelen veriyi Bilgisayara gonder
  if (mySerial.available()) {
    Serial.write(mySerial.read());
  }
  
  // Bilgisayardan gelen veriyi SIM900'e gonder
  if (Serial.available()) {
    mySerial.write(Serial.read());
  }
}
